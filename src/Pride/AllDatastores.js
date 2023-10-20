import _ from 'underscore';

const AllDatastores = {
  array: [],

  get: function (uid) {
    return _.find(
      this.array,
      function (datastore) {
        return datastore.get('uid') === uid;
      }
    );
  },

  newSearch: function (uid) {
    const datastore = _.find(
      this.array,
      function (datastore) {
        return datastore.get('uid') === uid;
      }
    );

    return datastore ? datastore.baseSearch() : undefined;
  },

  each: function (func) {
    _.each(this.array, func);

    return this;
  }
};

export default AllDatastores;
