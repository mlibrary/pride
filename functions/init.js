var Pride = Pride || {};

Pride.init = function(on_success, on_failure, attempts) {
  on_success = on_success || function() {};

  if (this.already_initialized) {
    on_success();
  } else {
    var self = this;

    Pride.request({
      url:             Pride.settings.datastores_url,
      attempts:        attempts,
      failure:         on_failure,
      failure_message: 'Failed to load datastores',
      success: function(response) {
        self.already_initialized = true;

        Pride.AllDatastores.array = _.map(
          response['response'],
          function(datastore_data) {
            return new Pride.Datastore(datastore_data);
          }
        );

        on_success();
      }
    });
  }
};

Pride.init.already_initialized = false;
