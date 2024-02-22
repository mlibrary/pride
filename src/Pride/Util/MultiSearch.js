import safeApply from './safeApply';

const MultiSearch = function (uid, muted, searchArray) {
  this.searches = searchArray;
  this.uid = uid;

  this.set = (values) => {
    searchArray.forEach((search) => {
      search.set(values);
    });
    return this;
  };

  const funcOnEach = (funcName, beforeFunc) => {
    const self = this;
    return function (...args) {
      safeApply(beforeFunc, args);
      searchArray.forEach((search) => {
        search[funcName].apply(search, args);
      });
      return self;
    };
  };

  this.run = funcOnEach('run');
  this.nextPage = funcOnEach('nextPage');
  this.prevPage = funcOnEach('prevPage');
  this.setMute = funcOnEach('setMute', function (state) {
    muted = state;
  });

  this.getMute = function () {
    return muted;
  };

  this.setMute(muted);
};

export default MultiSearch;
