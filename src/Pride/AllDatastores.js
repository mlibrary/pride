import _ from 'underscore';

const AllDatastores = {
  array: [],

  get: function (uid) {
    return this.array.find((datastore) => {
      return datastore.get('uid') === uid;
    });
  },

  each: function (func) {
    _.each(this.array, func);

    return this;
  }
};

export default AllDatastores;
