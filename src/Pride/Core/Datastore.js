import _ from 'underscore';
import deepClone from '../Util/deepClone';
import Query from './Query';
import DatastoreSearch from './DatastoreSearch';
import request from '../Util/request';
import FieldTree from '../FieldTree';

const Datastore = function(datastoreInfo) {
  datastoreInfo = deepClone(datastoreInfo);

  this.baseQuery = () => {
    return new Query({
      uid: datastoreInfo.uid,
      sort: datastoreInfo.default_sort,
      start: 0,
      count: 0,
      settings: {},
      fieldTree: fillFieldTree(),
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

  this.get = (key) => {
    return datastoreInfo[key];
  };

  this.update = (newInfo) => {
    _.extend(datastoreInfo, newInfo);
  };

  const fillFacets = (setFacets) => {
    return _.reduce(
      datastoreInfo.facets,
      (memo, facet) => {
        memo[facet.uid] = _.find(setFacets, (possibleFacet) => {
          return possibleFacet.uid === facet.uid;
        }) || facet;

        return memo;
      },
      {}
    );
  };

  const fillFieldTree = (givenTree) => {
    givenTree = givenTree || new FieldTree.FieldBoolean('AND');

    const output = _.reduce(
      datastoreInfo.fields,
      (tree, field) => {
        if (
          (field.required || field.fixed) &&
          !tree.contains({ type: 'field', value: field.uid })
        ) {
          const missingField = new FieldTree.Field(
            field.uid,
            new FieldTree.Literal(field.default_value)
          );

          if (_.isMatch(tree, { type: 'field_boolean', value: 'AND' })) {
            return tree.addChild(missingField);
          } else {
            return new FieldTree.FieldBoolean('AND', tree, missingField);
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
