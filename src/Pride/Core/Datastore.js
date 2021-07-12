import _ from 'underscore';
import deepClone from '../Util/deepClone';
import Query from './Query';
import DatastoreSearch from './DatastoreSearch';
import DatastoreBrowse from './DatastoreBrowse';
import request from '../Util/request';

const Datastore = function(datastoreInfo) {
  datastoreInfo = deepClone(datastoreInfo);

  this.baseQuery = () => {
    return new Query({
      uid: datastoreInfo.uid,
      sort: datastoreInfo.default_sort,
      start: 0,
      count: 0,
      settings: {},
      facets: _.reduce(
        datastoreInfo.facets,
        (memo, facet) => {
          if (facet.required && !facet.fixed) {
            memo[facet.uid] = facet.default_value;
          }

          return memo;
        },
        {}
      )
    });
  };

  this.baseSearch = function() {
    return new DatastoreSearch({ datastore: this });
  };

  this.runQuery = function(requestArguments) {
    requestArguments.url = datastoreInfo.url;
    request(requestArguments);

    return this;
  };

  this.baseBrowse = function() {
    return new DatastoreBrowse({ datastore: this });
  };

  this.runBrowse = function(requestArguments) {
    requestArguments.url = `${datastoreInfo.url}/browse`;
    request(requestArguments);

    return this;
  };

  this.get = (key) => {
    return datastoreInfo[key];
  };

  this.update = (newInfo) => {
    _.extend(datastoreInfo, newInfo);
  };
};

export default Datastore;
