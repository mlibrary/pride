var Pride = Pride || {};

Pride.Search = function(datastore, given_query) {

  ///////////////
  // Observers //
  ///////////////

  var records_observers = new Pride.Observable();
  var search_observers  = new Pride.Observable();

  this.addRecordsObserver = function(func) {
    records_observers.addObserver(func);

    return this_search;
  };

  this.addSearchObserver = function(func) {
    search_observers.addObserver(func);
    func(query);

    return this_search;
  };

  var recordsChanged = function() {
    console.log('UPDATED RECORDS:', getRecordsInQuery())
    records_observers.notifyObservers(getRecordsInQuery());
  };

  var searchChanged = function() {
    var data = {
                 uid:             datastore.get('uid'),
                 metadata:        Pride.deepClone(datastore.get('metadata')),
                 sorts:           Pride.deepClone(datastore.get('sorts')),
                 current_sort:    query.get('sort'),
                 fields:          Pride.deepClone(datastore.get('fields')),
                 field_tree:      Pride.deepClone(query.get('field_tree')),
                 start:           query.get('start'),
                 end:             query.get('end'),
                 count:           query.get('count'),
                 total_available: query.get('total_available'),
                 settings:        Pride.deepClone(query.get('settings'))
               };

    console.log('UPDATED SEARCH:', data)
    search_observers.notifyObservers(data);
  };

  /////////////////////////
  // Performing Searches //
  /////////////////////////

  var this_search = this;
  var records     = [];
  var query       = given_query || datastore.baseQuery();

  var defaultCacheSize = Pride.settings.cache_size[datastore.uid] ||
                         Pride.settings.default_cache_size;

  this.set = function(key, value) {
    query.set(key, value);
    searchChanged();

    if (key != 'count' && key != 'start') records = [];

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
                           .set('start', requested_section.start)
                           .set('count', requested_section.calcLength());

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

    var new_total_available = result.total_available;
    var new_end             = query.get('end');

    if (new_total_available == 0) {
      new_end = undefined;
    } else if (new_end >= new_total_available) {
      new_end = new_total_available - 1;
    }

    query.update(result.new_request)
         .set('total_available', new_total_available)
         .set('end', new_end);

    searchChanged();
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
