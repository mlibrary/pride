// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.core.MultiSearch = function(uid, muted, searches) {
  var query_data = {};
  var self       = this;

  this.searches = searches;
  this.uid      = uid;

  this.set = function(values) {
    _.extend(query_data, values);

    _.each(
      self.searches,
      function(search) {
        search.set(
          translateValues(
            values,
            search.get('uid')
          )
        );
      }
    );

    return self;
  };

  this.run = function(cache_size) {
    _.each(self.searches, function(search) { search.run(cache_size); });

    return self;
  };

  this.setMute = function(state) {
    muted = state;
    _.each(self.searches, function(search) { search.setMute(state); });

    return self;
  };

  this.getMute = function() {
    return muted;
  };

  var translateValues = function(values, search_uid) {
    // FIRST:  Convert or remove fields in the field_tree if nessesary
    // SECOND: Convert or remove facets if nessesary
    // THIRD:  Convert or remove settings if nessesary
    // FOURTH: Convert the sort setting

    return values;
  };

  this.setMute(muted);
};
