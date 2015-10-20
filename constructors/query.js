var Pride = Pride || {};

Pride.Query = function(query_info) {
  query_info = Pride.deepClone(query_info);

  // Set the default request_id if it isn't already set
  query_info.request_id = query_info.request_id || 0;

  var mutable_keys = [
                       'start',
                       'count',
                       'total_available',
                       'request_id',
                       'end',
                       'index_limit'
                     ];

  this.get = function(key) {
    switch (key) {
      case 'end':
        var last_key = query_info.start + query_info.count - 1;
        return (last_key < query_info.start) ? undefined : last_key;

      case 'index_limit':
        var total_available = query_info.total_available;

        if (_.isNumber(total_available)) {
          return total_available - 1;
        } else {
          return Infinity;
        }

      default:
        return query_info[key];
    }
  };

  this.set = function(key, value) {
    switch (key) {
      case 'end':
        this.set('count', value - query_info.start + 1);
        break;
      default:
        query_info[key] = value;
    }

    if (!_.contains(mutable_keys, key)) {
      query_info.request_id++;
    }

    return this;
  };

  this.clone = function() {
    return new Pride.Query(Pride.deepClone(query_info));
  };

  // Update the data in this query sans a few items without triggering the
  // additional operations that set() does.
  this.update = function(new_data) {
    _.extend(
      query_info,
      _.omit(new_data.new_request, 'start', 'count', 'request_id')
    );

    return this;
  };

  this.toSection = function() {
    return new Pride.Section(this.get('start'), this.get('end'));
  };

  this.toLimitSection = function() {
    return new Pride.Section(this.get('start'), this.get('index_limit'));
  };

  this.toJSON = function() {
    return _.pick(
             query_info,
             'uid',
             'request_id',
             'start',
             'count',
             'field_tree',
             'facets',
             'sort',
             'settings'
           );
  };
};
