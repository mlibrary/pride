var Pride = Pride || {};

Pride.MultiSearch = function(datastores) {
  this.datastores = datastores;
  var query_data  = {};

  this.set = function(values) {
    _.extend(query_data, values);

    _.each(
      this.datastores,
      function(datastore) {
        datastore.set(
          translate_values(
            values,
            datastore.get('uid')
          )
        );
      }
    );

    return this;
  };

  this.run = function() {
    _.each(
      this.datastores,
      function(datastore) { datastore.run(); }
    );

    return this;
  };

  var translate_values = function(values, datastore_uid) {
    // FIRST:  Convert or remove fields in the field_tree if nessesary
    // SECOND: Convert or remove facets if nessesary
    // THIRD:  Convert or remove settings if nessesary
    // FOURTH: Convert the sort setting

    return values;
  };
};
