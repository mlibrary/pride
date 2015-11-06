var Pride = Pride || {};

Pride.AllDatastores = {
  array: [],

  newSearch: function(uid) {
    var datastore = _.find(
                    this.array,
                    function(datastore) { return datastore.get('uid') == uid; }
                  );

    return datastore ? datastore.baseSearch() : undefined;
  },

  each: function(func) {
    _.each(this.array, func);

    return this;
  }
};

