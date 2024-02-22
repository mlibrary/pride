import Paginator from '../Util/Paginator/index';
import deepClone from '../Util/deepClone';
import Section from '../Util/Section';

class Query {
  static paginatorKeys = Paginator.getPossibleKeys;

  constructor (queryInfo) {
    this.paginator = new Paginator({
      start: queryInfo.start,
      count: queryInfo.count
    });

    this.queryInfo = deepClone(queryInfo);
    Query.paginatorKeys.forEach((paginatorKey) => {
      delete this.queryInfo[paginatorKey];
    });

    this.queryInfo.request_id = this.queryInfo.request_id || 0;
  }

  get (key) {
    if (Query.paginatorKeys.includes(key)) {
      return this.paginator.get(key);
    }

    return this.queryInfo[key];
  }

  set (newValues) {
    const newPaginationValues = { ...newValues };
    const newQueryValues = { ...newValues };
    Query.paginatorKeys.forEach((paginatorKey) => {
      if (paginatorKey in newValues) {
        delete newQueryValues[paginatorKey];
      } else {
        delete newPaginationValues[paginatorKey];
      }
    });

    if (Object.keys(newQueryValues).length > 0) {
      this.paginator.set({ total_available: undefined });
      if (typeof newQueryValues.request_id !== 'number') {
        this.queryInfo.request_id += 1;
      }
    }

    this.paginator.set(newPaginationValues);
    this.queryInfo = { ...this.queryInfo, ...newQueryValues };

    return this;
  }

  clone () {
    const fullInfo = deepClone(this.queryInfo);
    fullInfo.start = this.paginator.get('start');
    fullInfo.count = this.paginator.get('count');

    return new Query(fullInfo);
  }

  toSection () {
    return new Section(this.get('start'), this.get('end'));
  }

  toLimitSection () {
    return new Section(this.get('start'), this.get('index_limit'));
  }

  toJSON () {
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
  }
}

export default Query;
