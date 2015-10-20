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
  },

  update: function(args) {
    this.array       = [];
    pride_datastores = this.array;

    Pride.request({
      url: Pride.settings.datastores_url,
      failure: args.failure,
      success: function(response) {
        _.each(
          response['response'],
          function(datastore_data) {
            pride_datastores.push(new Pride.Datastore(datastore_data));
          }
        );

        if (_.isFunction(args.success)) {
          args.success();
        }
      }
    });
  }
};

