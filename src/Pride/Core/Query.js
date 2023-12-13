import Paginator from '../Util/Paginator/index';
import deepClone from '../Util/deepClone';
import Section from '../Util/Section';

const Query = function (queryInfo) {
  // Setup the paginator to do all pagination calculations.
  const paginator = new Paginator({
    start: queryInfo.start,
    count: queryInfo.count
  });

  // Memoize the paginator keys for future use.
  const paginatorKeys = Paginator.getPossibleKeys;

  // Remove the pagination info from queryInfo.
  queryInfo = deepClone(queryInfo);
  paginatorKeys.forEach((paginatorKey) => {
    delete queryInfo[paginatorKey];
  });

  // Set the default request_id if it isn't already set.
  queryInfo.request_id = queryInfo.request_id || 0;

  this.get = function (key) {
    if (Paginator.getPossibleKeys.includes(key)) {
      return paginator.get(key);
    }

    return queryInfo[key];
  };

  this.set = function (newValues) {
    const [newPaginationValues, newQueryValues] = [{ ...newValues }, { ...newValues }];
    paginatorKeys.forEach((paginatorKey) => {
      if (Object.keys(newValues).includes(paginatorKey)) {
        delete newQueryValues[paginatorKey];
      } else {
        delete newPaginationValues[paginatorKey];
      }
    });

    // If the set of things being searched was altered...
    if (Object.keys(newQueryValues).length > 0) {
      paginator.set({ total_available: undefined });

      if (typeof newQueryValues.request_id !== 'number') {
        queryInfo.request_id += 1;
      }
    }

    paginator.set(newPaginationValues);
    queryInfo = { ...queryInfo, ...newQueryValues };

    return this;
  };

  this.clone = function () {
    const fullInfo = deepClone(queryInfo);
    fullInfo.start = paginator.get('start');
    fullInfo.count = paginator.get('count');

    return new Query(fullInfo);
  };

  this.toSection = function () {
    return new Section(this.get('start'), this.get('end'));
  };

  this.toLimitSection = function () {
    return new Section(this.get('start'), this.get('index_limit'));
  };

  this.toJSON = function () {
    return {
      uid: this.get('uid'),
      request_id: this.get('request_id'),
      start: this.get('start'),
      count: this.get('count'),
      field_tree: this.get('field_tree'),
      facets: this.get('facets'),
      sort: this.get('sort'),
      settings: this.get('settings'),
      raw_query: this.get('raw_query')
    };
  };
};

export default Query;
