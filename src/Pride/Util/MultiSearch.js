class MultiSearch {
  constructor (uid, muted, searchArray) {
    this.searches = searchArray;
    this.uid = uid;
    this.muted = muted;
    this.setMute(muted);
  }

  setMute = (state) => {
    this.muted = state;
    this.searches.forEach((search) => {
      if (typeof search.setMute === 'function') {
        search.setMute(state);
      }
    });
  };

  getMute = () => {
    return this.muted;
  };

  set = (values) => {
    this.searches.forEach((search) => {
      if (typeof search.set === 'function') {
        search.set(values);
      }
    });
    return this;
  };

  funcOnEach = (funcName, beforeFunc) => {
    return (...args) => {
      beforeFunc?.call(this, ...args);
      this.searches.forEach((search) => {
        if (typeof search[funcName] === 'function') {
          search[funcName](...args);
        }
      });
      return this;
    };
  };

  run = this.funcOnEach('run');
  nextPage = this.funcOnEach('nextPage');
  prevPage = this.funcOnEach('prevPage');
}

export default MultiSearch;
