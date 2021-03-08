import { _ } from 'underscore';

// import Settings from '../Settings';
import slice from '../Util/slice';
// import log from './log';
import safeCall from '../Util/safeCall';
import Paginater from '../Util/Paginater';
// import Section from '../Util/Section';
// import Messenger from './Messenger';
// import FuncBuffer from '../Util/FuncBuffer';

const SearchBase = function(setup, parent) {
  this.datastore = setup.datastore;
  this.query = setup.query || this.datastore.baseQuery();

  const self = this;
  const requestFunc = setup.requestFunc || this.datastore.runQuery;
  let results = setup.starting_results || [];
  const defaultCacheSize = setup.cacheSize ||
                         Settings.cacheSize[this.datastore.uid] ||
                         Settings.default_cacheSize;

  this.log = () => {
    const message = slice(arguments);
    message.unshift('Search (' + self.datastore.get('uid') + ')');

    log.apply(window, message);
  };

  /*
   * PERFORMING SEARCHES
   */

  this.set = (setHash) => {
    self.query.set(setHash);
    safeCall(self.setDataChanged);

    if (!_.isEmpty(_.omit(setHash, Paginater.getPossibleKeys()))) {
      results = [];
    }

    return self;
  };

  this.run = (cacheSize) => {
    safeCall(self.resultsChanged);

    if (_.isUndefined(cacheSize)) {
      cacheSize = defaultCacheSize;
    }

    requestResults(
      getMissingSection(
        self.query.toSection().expanded(cacheSize)
      )
    );

    return self;
  };

  this.results = () => {
    return resultsPiece(new Section(
      self.query.get('start'),
      Math.min(self.query.get('end'), self.query.get('index_limit'))
    ));
  };

  const requestResults = (requestedSection) => {
    self.log('REQUESTING', requestedSection);
    self.log('TOTAL AVAILABLE (pre-request)', self.query.get('totalAvailable'));

    if (requestedSection &&
        self.query.toLimitSection().overlaps(requestedSection)) {
      self.log('Sending query...');

      const newQuery = self.query.clone()
        .set({
          start: requestedSection.start,
          count: requestedSection.calcLength()
        });

      requestFunc({
        query: newQuery,
        failure_message: Messenger.preset(
          'failed_search_run',
          self.datastore.get('metadata').name
        ),
        success: (responseData) => {
          // Update things if the response matches the current query.
          if (responseData.request.requestId === self.query.get('requestId')) {
            updateData(responseData);
            addResults(responseData.response, newQuery.get('start'));

            const responseLength = responseData.response.length;

            // If we are missing results from the initial request...
            if (responseLength !== 0 &&
                responseLength < newQuery.get('count')) {
              requestResults(
                requestedSection.shifted(responseLength, 0)
              );
            }
          }
        }
      });
    } else {
      /*
       * We don't need to run a search, but should update run observers in case
       * set() was called since the last run().
       */
      safeCall(self.runDataChanged);
    }
  };

  const addResults = (newItemsArray, offset) => {
    let queryResultsAdded = false;

    self.log('NEW RECORDS', newItemsArray);

    _.each(newItemsArray, (itemData, arrayIndex) => {
      const itemIndex = arrayIndex + offset;

      // Update the results that are not already filled.
      if (_.isUndefined(results[itemIndex])) {
        results[itemIndex] = safeCall(self.createItem, itemData);

        if (self.query.toSection().inSection(itemIndex)) {
          queryResultsAdded = true;
        }
      }
    });

    self.log('CACHE LENGTH', results.length);

    if (queryResultsAdded || _.isEmpty(newItemsArray)) {
      safeCall(self.resultsChanged);
    }
  };

  const updateData = (responseData) => {
    self.datastore.update(responseData.datastore);

    const newQueryData = _.omit(responseData.new_request, 'start', 'count');
    newQueryData.specialists = responseData.specialists;
    newQueryData.totalAvailable = responseData.totalAvailable;
    self.query.set(newQueryData);

    safeCall(self.runDataChanged);
  };

  const getMissingSection = (section) => {
    const list = resultsPiece(section);
    let start = _.indexOf(list, undefined);

    // If the item is not found, indexOf returns -1.
    if (start !== -1) {
      const end = section.start + _.lastIndexOf(list, undefined);

      // Adjust for the offset from the start of the results.
      start += section.start;

      return new Section(start, end);
    }
  };

  const resultsPiece = (section) => {
    const output = [];

    for (let index = section.start; index <= section.end; index++) {
      output.push(results[index]);
    }

    return output;
  };

  /*
   * OBSERVABLES
   */

  let muted = false;
  const observables = [];
  const mutableObservables = [];

  this.clearAllObservers = () => {
    _.each(observables, (observable) => {
      observable.clearAll();
    });

    safeCall(self.initialize_observables);

    return self;
  };

  this.getMute = () => {
    return muted;
  };

  this.setMute = (state) => {
    if (state !== muted) {
      muted = state;
      safeCall(self.muteChanged());

      if (!muted) {
        _.each(mutableObservables, (observable) => {
          observable.notify();
        });
      }
    }

    return self;
  };

  this.createObservable = function(name, dataFunc, neverMute) {
    const object = new FuncBuffer(function() {
      const addObserver = this.add;
      const callObservers = this.call;

      observables.push(this);
      if (!neverMute) mutableObservables.push(this);

      this.add = function(func) {
        if (!self.muted || neverMute) func(dataFunc());

        addObserver(func, 'observers');

        return this;
      };

      this.notify = () => {
        if (!self.muted || neverMute) {
          const data = dataFunc();
          self.log('NOTIFY (' + name + ')', data);

          callObservers('observers', data);
        }

        return this;
      };
    });

    self[name + 'Changed'] = object.notify;
    parent[name + 'Observers'] = object;

    return self;
  };

  this.createObservable('mute', this.getMute, true)
    .createObservable('setData', () => {
      parent.getData();
    })
    .createObservable('runData', () => {
      parent.getData();
    })
    .createObservable('results', this.results);

  /*
   * UTILITIES
   */

  parent.set = (setHash) => {
    self.set(setHash);

    return parent;
  };

  parent.run = (cacheSize) => {
    self.run(cacheSize);

    return parent;
  };

  parent.nextPage = (cacheSize) => {
    const currentPage = self.query.get('page');
    if (_.isNumber(currentPage) && currentPage < self.query.get('page_limit')) {
      parent.set({ page: currentPage + 1 });
      parent.run(cacheSize);
    }

    return parent;
  };

  parent.prevPage = (cacheSize) => {
    const currentPage = self.query.get('page');
    if (_.isNumber(currentPage) && currentPage > 1) {
      parent.set({ page: currentPage - 1 });
      parent.run(cacheSize);
    }

    return parent;
  };
};

export default SearchBase;
