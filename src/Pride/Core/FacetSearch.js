import _ from 'underscore';
import FuncBuffer from '../Util/FuncBuffer';

const FacetSearch = function(setup) {
  let data = setup.data;
  const results = setup.results;

  /*
   * Data Getters
   */

  this.uid = data.uid;
  this.getData = () => data;
  this.getResults = () => results;

  /*
   * Muting
   */

  let muted = false;

  this.getMute = () => muted;

  this.setMute = (state) => {
    muted = state;
    return this;
  };

  /*
   * Observerables
   */

  const observables = [];

  this.clearAllObservers = () => {
    _.each(observables, (observable) => {
      observable.clearAll();
    });
    return this;
  };

  const createObservable = function(name, dataFunc) {
    const object = new FuncBuffer(function() {
      const addObserver = this.add;
      const callObservers = this.call;

      observables.push(this);

      this.add = function(func) {
        if (!self.muted) func(dataFunc());
        addObserver(func, 'observers');
        return this;
      };

      this.notify = function() {
        if (!self.muted) {
          data = dataFunc();
          self.log(`NOTIFY (${name})`, data);
          callObservers('observers', data);
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
