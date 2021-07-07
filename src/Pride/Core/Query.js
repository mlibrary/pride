import _ from 'underscore';
import Paginater from '../Util/Paginater';
import deepClone from '../Util/deepClone';
import Section from '../Util/Section';

const Query = function(queryInfo) {
  // Setup the paginater to do all pagination calculations.
  const paginater = new Paginater({
    start: queryInfo.start,
    count: queryInfo.count
  });

  // Memoize the paginater keys for future use.
  const paginaterKeys = paginater.getPossibleKeys();

  // Remove the pagination info from queryInfo.
  queryInfo = _.omit(deepClone(queryInfo), paginaterKeys);

  // Set the default request_id if it isn't already set.
  queryInfo.request_id = queryInfo.request_id || 0;

  this.get = (key) => {
    if (paginater.hasKey(key)) {
      return paginater.get(key);
    } else {
      return queryInfo[key];
    }
  };

  this.set = function(newValues) {
    const newPaginationValues = _.pick(newValues, paginaterKeys);
    const newQueryValues = _.omit(newValues, paginaterKeys);

    // If the set of things being searched was altered...
    if (!_.isEmpty(newQueryValues)) {
      paginater.set({ total_available: undefined });

      if (!_.isNumber(newQueryValues.request_id)) {
        queryInfo.request_id += 1;
      }
    }

    paginater.set(newPaginationValues);
    _.extend(queryInfo, newQueryValues);

    return this;
  };

  this.clone = () => {
    const fullInfo = deepClone(queryInfo);
    fullInfo.start = paginater.get('start');
    fullInfo.count = paginater.get('count');

    return new Query(fullInfo);
  };

  this.toSection = function() {
    return new Section(this.get('start'), this.get('end'));
  };

  this.toLimitSection = function() {
    return new Section(this.get('start'), this.get('index_limit'));
  };

  this.toJSON = function() {
    return {
      uid: this.get('uid'),
      request_id: this.get('request_id'),
      start: this.get('start'),
      count: this.get('count'),
      field_tree: this.get('field_tree'),
      facets: this.get('facets'),
      sort: this.get('sort'),
      settings: this.get('settings')
    };
  };
};

export default Query;
