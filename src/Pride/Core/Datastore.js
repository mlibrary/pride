import _ from 'underscore';
import deepClone from '../Util/deepClone';
import Query from './Query';
import DatastoreSearch from './DatastoreSearch';
import request from '../Util/request';
import FieldBoolean from '../FieldTree/FieldBoolean';
import Field from '../FieldTree/Field';
import Literal from '../FieldTree/Literal';

const Datastore = function (datastore_info) {
  datastore_info = deepClone(datastore_info);

  this.baseQuery = function () {
    return new Query({
      uid: datastore_info.uid,
      sort: datastore_info.default_sort,
      start: 0,
      count: 0,
      settings: {},
      field_tree: fillFieldTree(),
      facets: _.reduce(
        datastore_info.facets,
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

  this.runQuery = function (request_arguments) {
    request_arguments.url = datastore_info.url;
    request(request_arguments);

    return this;
  };

  this.get = function (key) {
    return datastore_info[key];
  };

  this.update = function (new_info) {
    _.extend(datastore_info, new_info);
  };

  const fillFacets = function (set_facets) {
    return _.reduce(
      datastore_info.facets,
      function (memo, facet) {
        memo[facet.uid] = _.find(set_facets, function (possible_facet) {
          return possible_facet.uid === facet.uid;
        }) ||
                                 facet;

        return memo;
      },
      {}
    );
  };

  var fillFieldTree = function (given_tree) {
    given_tree = given_tree || new FieldBoolean('AND');

    const output = _.reduce(
      datastore_info.fields,
      function (tree, field) {
        if ((field.required || field.fixed) &&
                     !tree.contains({ type: 'field', value: field.uid })) {
          missing_field = new Field(
            field.uid,
            new Literal(field.default_value)
          );

          if (_.isMatch(tree, { type: 'field_boolean', value: 'AND' })) {
            return tree.addChild(missing_field);
          } else {
            return new FieldBoolean('AND', tree, missing_field);
          }
        }

        return tree;
      },
      given_tree
    );

    return output.matches({ type: 'field_boolean', children: [] }) ? {} : output;
  };
};

export default Datastore;
