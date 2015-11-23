// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

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
          translateValues(
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

  var translateValues = function(values, datastore_uid) {
    // FIRST:  Convert or remove fields in the field_tree if nessesary
    // SECOND: Convert or remove facets if nessesary
    // THIRD:  Convert or remove settings if nessesary
    // FOURTH: Convert the sort setting

    return values;
  };
};
