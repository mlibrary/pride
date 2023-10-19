import _ from 'underscore';
import Settings from '../Settings';
import slice from '../Util/slice';
import log from './log';
import safeCall from '../Util/safeCall';
import getPossibleKeys from '../Util/Paginater/getPossibleKeys';
import Section from '../Util/Section';
import Messenger from '../Messenger';
import FuncBuffer from '../Util/FuncBuffer';

const SearchBase = function (setup, parent) {
  this.datastore = setup.datastore;
  this.query = setup.query || this.datastore.baseQuery();

  const self = this;
  const requestFunc = setup.requestFunc || this.datastore.runQuery;
  let results = setup.starting_results || [];
  const defaultCacheSize = setup.cache_size ||
                         Settings.cache_size[this.datastore.uid] ||
                         Settings.default_cache_size;

  this.log = function () {
    const message = slice(arguments);
    message.unshift('Search (' + self.datastore.get('uid') + ')');

    log.apply(window, message);
  };

  /// //////////////////////
  // Performing Searches //
  /// //////////////////////

  this.set = function (set_hash) {
    self.query.set(set_hash);
    safeCall(self.setDataChanged);

    if (!_.isEmpty(_.omit(set_hash, getPossibleKeys()))) {
      results = [];
    }

    return self;
  };

  this.run = function (cache_size) {
    safeCall(self.resultsChanged);

    if (_.isUndefined(cache_size)) {
      cache_size = defaultCacheSize;
    }

    requestResults(
      getMissingSection(
        self.query.toSection().expanded(cache_size)
      )
    );

    return self;
  };

  this.results = function () {
    return resultsPiece(new Section(
      self.query.get('start'),
      Math.min(self.query.get('end'), self.query.get('index_limit'))
    ));
  };

  var requestResults = function (requested_section) {
    self.log('REQUESTING', requested_section);
    self.log('TOTAL AVAILABLE (pre-request)', self.query.get('total_available'));

    if (requested_section &&
        self.query.toLimitSection().overlaps(requested_section)) {
      self.log('Sending query...');

      const new_query = self.query.clone()
        .set({
          start: requested_section.start,
          count: requested_section.calcLength()
        });

      requestFunc({
        query: new_query,
        failure_message: Messenger.preset(
          'failed_search_run',
          self.datastore.get('metadata').name
        ),
        success: function (response_data) {
          // Update things if the response matches the current query.
          if (response_data.request.request_id == self.query.get('request_id')) {
            updateData(response_data);
            addResults(response_data.response, new_query.get('start'));

            const response_length = response_data.response.length;

            // If we are missing results from the initial request...
            if (response_length !== 0 &&
                response_length < new_query.get('count')) {
              requestResults(
                requested_section.shifted(response_length, 0)
              );
            }
          }
        }
      });
    } else {
      // We don't need to run a search, but should update run observers in case
      // set() was called since the last run().
      safeCall(self.runDataChanged);
    }
  };

  var addResults = function (new_items_array, offset) {
    let query_results_added = false;

    self.log('NEW RECORDS', new_items_array);

    _.each(new_items_array, function (item_data, array_index) {
      const item_index = array_index + offset;

      // Update the results that are not already filled.
      if (_.isUndefined(results[item_index])) {
        results[item_index] = safeCall(self.createItem, item_data);

        if (self.query.toSection().inSection(item_index)) {
          query_results_added = true;
        }
      }
    });

    self.log('CACHE LENGTH', results.length);

    if (query_results_added || _.isEmpty(new_items_array)) {
      safeCall(self.resultsChanged);
    }
  };

  var updateData = function (response_data) {
    self.datastore.update(response_data.datastore);

    const new_query_data = _.omit(response_data.new_request, 'start', 'count');
    new_query_data.specialists = response_data.specialists;
    new_query_data.total_available = response_data.total_available;
    self.query.set(new_query_data);

    safeCall(self.runDataChanged);
  };

  var getMissingSection = function (section) {
    const list = resultsPiece(section);
    let start = _.indexOf(list, undefined);

    // If the item is not found, indexOf returns -1.
    if (start != -1) {
      const end = section.start + _.lastIndexOf(list, undefined);

      // Adjust for the offset from the start of the results.
      start += section.start;

      return new Section(start, end);
    }
  };

  var resultsPiece = function (section) {
    const output = [];

    for (let index = section.start; index <= section.end; index++) {
      output.push(results[index]);
    }

    return output;
  };

  /// ////////////////
  // Observerables //
  /// ////////////////

  let muted = false;
  const observables = [];
  const mutable_observables = [];

  this.clearAllObservers = function () {
    _.each(observables, function (observable) {
      observable.clearAll();
    });

    safeCall(self.initialize_observables);

    return self;
  };

  this.getMute = function () {
    return muted;
  };

  this.setMute = function (state) {
    if (state != muted) {
      muted = state;
      safeCall(self.muteChanged());

      if (!muted) {
        _.each(mutable_observables, function (observable) {
          observable.notify();
        });
      }
    }

    return self;
  };

  this.createObservable = function (name, data_func, never_mute) {
    const object = new FuncBuffer(function () {
      const add_observer = this.add;
      const call_observers = this.call;

      observables.push(this);
      if (!never_mute) mutable_observables.push(this);

      this.add = function (func) {
        if (!self.muted || never_mute) func(data_func());

        add_observer(func, 'observers');

        return this;
      };

      this.notify = function () {
        if (!self.muted || never_mute) {
          const data = data_func();
          self.log('NOTIFY (' + name + ')', data);

          call_observers('observers', data);
        }

        return this;
      };
    });

    self[name + 'Changed'] = object.notify;
    parent[name + 'Observers'] = object;

    return self;
  };

  this.createObservable('mute', this.getMute, true)
    .createObservable('setData', function () {
      parent.getData();
    })
    .createObservable('runData', function () {
      parent.getData();
    })
    .createObservable('results', this.results);

  /// ////////////
  // UTILITIES //
  /// ////////////

  parent.set = function (set_hash) {
    self.set(set_hash);

    return parent;
  };

  parent.run = function (cache_size) {
    self.run(cache_size);

    return parent;
  };

  parent.nextPage = function (cache_size) {
    const current_page = self.query.get('page');
    if (_.isNumber(current_page) && current_page < self.query.get('page_limit')) {
      parent.set({ page: current_page + 1 });
      parent.run(cache_size);
    }

    return parent;
  };

  parent.prevPage = function (cache_size) {
    const current_page = self.query.get('page');
    if (_.isNumber(current_page) && current_page > 1) {
      parent.set({ page: current_page - 1 });
      parent.run(cache_size);
    }

    return parent;
  };
};

export default SearchBase;
