import _ from 'underscore';
import slice from './slice';
import safeApply from './safeApply';

const MultiSearch = function(uid, muted, searchArray) {
  const queryData = {};
  const self = this;

  this.uid = uid;
  this.searches = searchArray;

  this.set = (values) => {
    _.extend(queryData, values);

    _.each(
      searchArray,
      (search) => search.set(values)
    );

    return this;
  };

  const funcOnEach = (funcName, beforeFunc) => {
    return function() {
      const args = slice(arguments);

      safeApply(beforeFunc, args);

      _.each(
        searchArray,
        (search) => search[funcName].apply(search, args)
      );

      return self;
    };
  };

  this.run = funcOnEach('run');
  this.nextPage = funcOnEach('nextPage');
  this.prevPage = funcOnEach('prevPage');
  this.setMute = funcOnEach('setMute', (state) => {
    muted = state;
  });

  this.getMute = () => muted;

  this.setMute(muted);
};

export default MultiSearch;
