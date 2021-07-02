// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import _ from 'underscore';

Pride.Core.Query = function(query_info) {
  // Setup the paginater to do all pagination calculations.
  var paginater = new Pride.Util.Paginater({
                    start: query_info.start,
                    count: query_info.count
                  });

  // Memoize the paginater keys for future use.
  var paginater_keys = Pride.Util.Paginater.getPossibleKeys();

  // Remove the pagination info from query_info.
  query_info = _.omit(Pride.Util.deepClone(query_info), paginater_keys);

  // Set the default request_id if it isn't already set.
  query_info.request_id = query_info.request_id || 0;

  this.get = function(key) {
    if (Pride.Util.Paginater.hasKey(key)) {
      return paginater.get(key);
    } else {
      return query_info[key];
    }
  };

  this.set = function(new_values) {
    var new_pagination_values = _.pick(new_values, paginater_keys);
    var new_query_values      = _.omit(new_values, paginater_keys);

    // If the set of things being searched was altered...
    if (!_.isEmpty(new_query_values)) {
      paginater.set({ total_available: undefined });

      if (!_.isNumber(new_query_values.request_id)) {
        query_info.request_id += 1;
      }
    }

    paginater.set(new_pagination_values);
    _.extend(query_info, new_query_values);

    return this;
  };

  this.clone = function() {
    var full_info   = Pride.Util.deepClone(query_info);
    full_info.start = paginater.get('start');
    full_info.count = paginater.get('count');

    return new Pride.Core.Query(full_info);
  };

  this.toSection = function() {
    return new Pride.Util.Section(this.get('start'), this.get('end'));
  };

  this.toLimitSection = function() {
    return new Pride.Util.Section(this.get('start'), this.get('index_limit'));
  };

  this.toJSON = function() {
    return {
             uid:        this.get('uid'),
             request_id: this.get('request_id'),
             start:      this.get('start'),
             count:      this.get('count'),
             field_tree: this.get('field_tree'),
             facets:     this.get('facets'),
             sort:       this.get('sort'),
             settings:   this.get('settings'),
             raw_query:  this.get('raw_query'),
             browse_field: this.get('browse_field')
           };
  };
};
