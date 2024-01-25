import FuncBuffer from '../Util/FuncBuffer';

const FacetSearch = function (setup) {
  // Data Getters
  this.uid = setup.data.uid;

  this.getData = () => {
    return setup.data;
  };

  this.getResults = () => {
    return setup.results;
  };

  // Muting
  let muted = false;

  this.getMute = () => {
    return muted;
  };

  this.setMute = (state) => {
    muted = state;
    return this;
  };

  // Observables
  this.observables = [];

  const createObservable = (dataFunc) => {
    const self = this;
    const object = new FuncBuffer(function () {
      self.observables.push(this);
      const addObserver = this.add;
      this.add = function (func) {
        if (!self.muted) func(dataFunc());
        addObserver(func, 'observers');
        return this;
      };
    });

    return object;
  };

  this.resultsObservers = createObservable(this.getResults);
  this.setDataObservers = this.runDataObservers = createObservable(this.getData);

  this.clearAllObservers = () => {
    this.observables.forEach((observable) => {
      observable.clearAll();
    });

    return this;
  };
};

export default FacetSearch;
