import _ from 'underscore';
import FuncBuffer from '../Util/FuncBuffer';

const FacetSearch = function (setup) {
  const example_facet = this;
  let data = setup.data;
  const results = setup.results;

  /// ///////////////
  // Data Getters //
  /// ///////////////

  this.uid = data.uid;
  this.getData = function () {
    return data;
  };
  this.getResults = function () {
    return results;
  };

  /// /////////
  // Muting //
  /// /////////

  let muted = false;

  this.getMute = function () {
    return muted;
  };

  this.setMute = function (state) {
    muted = state;

    return self;
  };

  /// ////////////////
  // Observerables //
  /// ////////////////

  const observables = [];

  this.clearAllObservers = function () {
    _.each(observables, function (observable) {
      observable.clearAll();
    });

    return self;
  };

  const createObservable = function (name, data_func) {
    const object = new FuncBuffer(function () {
      const add_observer = this.add;
      const call_observers = this.call;

      observables.push(this);

      this.add = function (func) {
        if (!self.muted) func(data_func());

        add_observer(func, 'observers');

        return this;
      };

      this.notify = function () {
        if (!self.muted) {
          data = data_func();
          self.log('NOTIFY (' + name + ')', data);

          call_observers('observers', data);
        }

        return this;
      };
    });

    return object;
  };

  this.resultsObservers = createObservable('results', this.getResults);
  this.setDataObservers = createObservable('setData', this.getData);
  this.runDataObservers = createObservable('runData', this.getData);
};

export default FacetSearch;
