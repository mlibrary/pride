const AllDatastores = {
  array: [],

  get: function (uid) {
    return this.array.find((datastore) => {
      return datastore.get('uid') === uid;
    });
  }
};

export default AllDatastores;
