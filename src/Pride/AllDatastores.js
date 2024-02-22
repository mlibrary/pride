const AllDatastores = {
  array: [],
  get (uid) {
    return this.array.find((datastore) => {
      return datastore.get('uid') === uid;
    });
  }
};

export default AllDatastores;
