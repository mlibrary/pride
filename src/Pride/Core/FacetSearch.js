import _ from 'underscore';
import FuncBuffer from '../Util/FuncBuffer';

const FacetSearch = function (setup) {
  const self = this;
  const data = setup.data;
  const results = setup.results;

  // Data Getters

  this.uid = data.uid;
  this.getData = function () {
    return data;
  };
  this.getResults = function () {
    return results;
  };

  // Muting

  let muted = false;

  this.getMute = function () {
    return muted;
  };

  this.setMute = function (state) {
    muted = state;

    return self;
  };

  // Observables

  const observables = [];

  const createObservable = function (name, dataFunc) {
    const object = new FuncBuffer(function () {
      const addObserver = this.add;

      observables.push(this);

      this.add = function (func) {
        if (!self.muted) func(dataFunc());
        addObserver(func, 'observers');

        return this;
      };
    });

    return object;
  };

  this.resultsObservers = createObservable('results', this.getResults);
  this.setDataObservers = createObservable('setData', this.getData);
  this.runDataObservers = createObservable('runData', this.getData);

  this.clearAllObservers = function () {
    _.each(observables, function (observable) {
      observable.clearAll();
    });

    return self;
  };
};

export default FacetSearch;
