import _ from 'underscore';
import slice from './slice';
import safeApply from './safeApply';

const MultiSearch = function (uid, muted, search_array) {
  const query_data = {};
  const self = this;

  this.searches = search_array;
  this.uid = uid;

  this.set = function (values) {
    _.extend(query_data, values);

    _.each(
      search_array,
      function (search) {
        search.set(values);
      }
    );

    return self;
  };

  const funcOnEach = function (func_name, before_func) {
    return function () {
      const args = slice(arguments);

      safeApply(before_func, args);

      _.each(search_array, function (search) {
        search[func_name].apply(search, args);
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
