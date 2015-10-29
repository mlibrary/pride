var Pride = Pride || {};

Pride.Search = function(datastore, given_query) {

  ///////////////
  // Observers //
  ///////////////

  var records_observers    = new Pride.Observable();
  var set_search_observers = new Pride.Observable();
  var run_search_observers = new Pride.Observable();

  this.addRecordsObserver = function(func) {
    records_observers.addObserver(func);
    recordsChanged(func);

    return this_search;
  };

  this.addSetSearchObserver = function(func) {
    set_search_observers.addObserver(func);
    setSearchChanged(func);

    return this_search;
  };

  this.addRunSearchObserver = function(func) {
    run_search_observers.addObserver(func);
    runSearchChanged(func);

    return this_search;
  };

  var recordsChanged = function(single_func) {
    console.log('UPDATED RECORDS:', getRecordsInQuery())
    notify(records_observers, getRecordsInQuery(), single_func);
  };

  var setSearchChanged = function(single_func) {
    console.log('UPDATED SEARCH (SET):', buildSearchData())
    notify(set_search_observers, buildSearchData(), single_func);
  };

  var runSearchChanged = function(single_func) {
    console.log('UPDATED SEARCH (RUN):', buildSearchData())
    notify(run_search_observers, buildSearchData(), single_func);
  };

  var notify = function(observers, data, single_func) {
    if (single_func) {
      single_func(data);
    } else {
      observers.notifyObservers(data);
    }
  };

  var buildSearchData = function() {
    return {
             uid:             datastore.get('uid'),
             metadata:        Pride.deepClone(datastore.get('metadata')),
             sorts:           Pride.deepClone(datastore.get('sorts')),
             current_sort:    query.get('sort'),
             fields:          Pride.deepClone(datastore.get('fields')),
             field_tree:      Pride.deepClone(query.get('field_tree')),
             settings:        Pride.deepClone(query.get('settings')),
             page:            query.get('page'),
             count:           query.get('count'),
             total_available: query.get('total_available'),
             total_pages:     query.get('total_pages')
           };
  };

  /////////////////////////
  // Performing Searches //
  /////////////////////////

  var this_search = this;
  var records     = [];
  var query       = given_query || datastore.baseQuery();

  var defaultCacheSize = Pride.settings.cache_size[datastore.uid] ||
                         Pride.settings.default_cache_size;

  this.set = function(set_hash) {
    query.set(set_hash);
    setSearchChanged();

    if (!_.isEmpty(_.omit(set_hash, 'count', 'start', 'end'))) records = [];

    return this_search;
  };

  this.run = function(cache_size) {
    recordsChanged();

    if (_.isUndefined(cache_size)) {
      cache_size = defaultCacheSize;
    }

    requestRecords(
      getMissingSection(
        query.toSection().expanded(cache_size)
      )
    );

    return this_search;
  };

  var requestRecords = function(requested_section) {
    if (requested_section &&
        query.toLimitSection().overlaps(requested_section)) {
      var new_query = query.clone()
                           .set({
                             start: requested_section.start,
                             count: requested_section.calcLength()
                           });

      datastore.runQuery({
        query: new_query,
        failure_message: 'Search Request Failed',
        success: function(result) {
          // Update things if the response matches the current query.
          if (result.request.request_id == query.get('request_id')) {
            updateQueryAndDatastore(result);
            addRecords(result.response, new_query.get('start'));

            // If we are missing records from the initial request...
            if (result.response.length !== 0 &&
                result.response.length < new_query.get('count')) {
              requestRecords(
                requested_section.shifted(result.response.length, 0)
              );
            }
          }
        }
      });
    }
  };

  var addRecords = function(new_record_array, offset) {
    var query_results_added = false;

    console.log('NEW RECORDS', new_record_array)

    _.each(new_record_array, function(new_record, array_index) {
      var record_index = array_index + offset;

      // Update the records that are not already filled.
      if (_.isUndefined(records[record_index])) {
        records[record_index] = new_record;
        if (query.toSection().inSection(record_index)) {
          query_results_added = true;
        }
      }
    });

    console.log('CACHE SIZE:', records.length);

    if (query_results_added || _.isEmpty(new_record_array)) recordsChanged();
  };

  var updateQueryAndDatastore = function(result) {
    datastore.update(result.datastore);

    var query_data             = _.omit(result.new_request, 'start', 'count');
    query_data.total_available = result.total_available;
    query.set(query_data);

    runSearchChanged();
  };

  var getMissingSection = function(section) {
    var list  = recordsPiece(section);
    var start = _.indexOf(list, undefined);

    // If the item is not found, indexOf returns -1.
    if (start != -1) {
      var end = section.start + _.lastIndexOf(list, undefined);

      // Adjust for the offset from the start of the records.
      start += section.start;

      return new Pride.Section(start, end);
    }

  };

  var getRecordsInQuery = function() {
    return recordsPiece(new Pride.Section(
             query.get('start'),
             Math.min(query.get('end'), query.get('index_limit'))
           ));
  };

  var recordsPiece = function(section) {
    var output = [];

    for (var index = section.start; index <= section.end; index++) {
      output.push(records[index]);
    }

    return output;
  };
};
