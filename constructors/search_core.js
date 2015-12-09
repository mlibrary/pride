// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.SearchCore = function(setup) {
  this.datastore = setup.datastore;
  this.query     = setup.query || this.datastore.baseQuery();

  var self             = this;
  var request_func     = setup.request_func || this.datastore.runQuery;
  var results          = setup.starting_results || [];
  var defaultCacheSize = Pride.Settings.cache_size[this.datastore.uid] ||
                         Pride.Settings.default_cache_size;

  this.log = function() {
    var message = Pride.Util.slice(arguments);
    message.unshift('Search (' + self.datastore.get('uid') + ')');

    Pride.Core.log.apply(window, message);
  };

  /////////////////////////
  // Performing Searches //
  /////////////////////////

  this.set = function(set_hash) {
    self.query.set(set_hash);
    Pride.Util.safeCall(self.setDataChanged);

    if (!_.isEmpty(_.omit(set_hash, Pride.Util.Paginater.getPossibleKeys()))) {
      results = [];
    }

    return self;
  };

  this.run = function(cache_size) {
    Pride.Util.safeCall(self.resultsChanged);

    if (_.isUndefined(cache_size)) {
      cache_size = defaultCacheSize;
    }

    requestResults(
      getMissingSection(
        self.query.toSection().expanded(cache_size)
      )
    );

    return self;
  };

  this.results = function() {
    return resultsPiece(new Pride.Util.Section(
             self.query.get('start'),
             Math.min(self.query.get('end'), self.query.get('index_limit'))
           ));
  };

  var requestResults = function(requested_section) {
    if (requested_section &&
        self.query.toLimitSection().overlaps(requested_section)) {

      var new_query = self.query.clone()
                           .set({
                             start: requested_section.start,
                             count: requested_section.calcLength()
                           });

      request_func({
        query: new_query,
        failure_message: Pride.Messenger.preset(
                           'failed_search_run',
                           self.datastore.get('metadata').name
                         ),
        success: function(response_data) {
          // Update things if the response matches the current query.
          if (response_data.request.request_id == self.query.get('request_id')) {
            updateData(response_data);
            addResults(response_data.response, new_query.get('start'));

            var response_length = response_data.response.length;

            // If we are missing results from the initial request...
            if (response_length !== 0 &&
                response_length < new_query.get('count')) {
              requestResults(
                requested_section.shifted(response_length, 0)
              );
            }
          }
        }
      });
    } else {
      // We don't need to run a search, but should update run observers in case
      // set() was called since the last run().
      Pride.Util.safeCall(self.runDataChanged);
    }
  };

  var addResults = function(new_items_array, offset) {
    var query_results_added = false;

    self.log('NEW RECORDS', new_items_array);

    _.each(new_items_array, function(item_data, array_index) {
      var item_index = array_index + offset;

      // Update the results that are not already filled.
      if (_.isUndefined(results[item_index])) {
        results[item_index] = Pride.Util.safeCall(self.createItem, item_data);

        if (self.query.toSection().inSection(item_index)) {
          query_results_added = true;
        }
      }
    });

    self.log('CACHE LENGTH', results.length);

    if (query_results_added || _.isEmpty(new_items_array)) {
      Pride.Util.safeCall(self.resultsChanged);
    }
  };

  var updateData = function(response_data) {
    self.datastore.update(response_data.datastore);

    var new_query_data = _.omit(response_data.new_request, 'start', 'count');
    new_query_data.total_available = response_data.total_available;
    self.query.set(new_query_data);

    Pride.Util.safeCall(self.runDataChanged);
  };

  var getMissingSection = function(section) {
    var list  = resultsPiece(section);
    var start = _.indexOf(list, undefined);

    // If the item is not found, indexOf returns -1.
    if (start != -1) {
      var end = section.start + _.lastIndexOf(list, undefined);

      // Adjust for the offset from the start of the results.
      start += section.start;

      return new Pride.Util.Section(start, end);
    }
  };

  var resultsPiece = function(section) {
    var output = [];

    for (var index = section.start; index <= section.end; index++) {
      output.push(results[index]);
    }

    return output;
  };
};
