// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.MultiSearch = function(uid, muted, search_array) {
  var query_data = {};
  var self       = this;

  this.searches = search_array;
  this.uid      = uid;

  this.set = function(values) {
    _.extend(query_data, values);

    var translated_values = translateValues(values, search.uid);

    _.each(
      search_array,
      function(search) {
        search.set(translated_values);
      }
    );

    return self;
  };

  var funcOnEach = function(func_name, before_func) {
    return function() {
             var args = Pride.Util.slice(arguments);

             Pride.Util.safeApply(before_func, args);

             _.each(search_array, function(search) {
               search[func_name].apply(this, search, args);
             });

             return self;
           };
  };

  this.run      = funcOnEach('run');
  this.nextPage = funcOnEach('nextPage');
  this.prevPage = funcOnEach('prevPage');
  this.setMute  = funcOnEach('setMute', function(state) { muted = state; });

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
