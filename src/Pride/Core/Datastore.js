import _ from 'underscore';
import deepClone from '../Util/deepClone';
import Query from './Query';
import DatastoreSearch from './DatastoreSearch';
import request from '../Util/request';
import FieldBoolean from '../FieldTree/FieldBoolean';
import Field from '../FieldTree/Field';
import Literal from '../FieldTree/Literal';

const Datastore = function (datastoreInfo) {
  datastoreInfo = deepClone(datastoreInfo);

  this.baseQuery = function () {
    return new Query({
      uid: datastoreInfo.uid,
      sort: datastoreInfo.default_sort,
      start: 0,
      count: 0,
      settings: {},
      field_tree: fillFieldTree(),
      facets: _.reduce(
        datastoreInfo.facets,
        function (memo, facet) {
          if (facet.required && !facet.fixed) {
            memo[facet.uid] = facet.default_value;
          }

          return memo;
        },
        {}
      )
    });
  };

  this.baseSearch = function () {
    return new DatastoreSearch({ datastore: this });
  };

  this.runQuery = function (requestArguments) {
    requestArguments.url = datastoreInfo.url;
    request(requestArguments);

    return this;
  };

  this.get = function (key) {
    return datastoreInfo[key];
  };

  this.update = function (newInfo) {
    _.extend(datastoreInfo, newInfo);
  };

  const fillFieldTree = function (givenTree) {
    givenTree = givenTree || new FieldBoolean('AND');

    const output = _.reduce(
      datastoreInfo.fields,
      function (tree, field) {
        if ((field.required || field.fixed) && !tree.contains({ type: 'field', value: field.uid })) {
          const missingField = new Field(
            field.uid,
            new Literal(field.default_value)
          );

          if (_.isMatch(tree, { type: 'field_boolean', value: 'AND' })) {
            return tree.addChild(missingField);
          } else {
            return new FieldBoolean('AND', tree, missingField);
          }
        }

        return tree;
      },
      givenTree
    );

    return output.matches({ type: 'field_boolean', children: [] }) ? {} : output;
  };
};

export default Datastore;
