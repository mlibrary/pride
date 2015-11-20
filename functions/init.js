// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

var Pride = Pride || {};

Pride.init = function(on_success, on_failure, attempts) {
  var self = Pride.init;

  if (self.is_initialized) {
    on_success();
  } else if (self.failed_init) {
    on_failure();
  } else {
    if (_.isFunction(on_success)) self.success_functions.push(on_success);
    if (_.isFunction(on_failure)) self.failure_functions.push(on_failure);

    if (!self.running_request) {
      self.running_request = true;

      Pride.request({
        url:             Pride.settings.datastores_url,
        attempts:        attempts,
        failure_message: 'Failed to load datastores',

        failure: function() {
          self.failed_init = true;
          self.failure_functions.call_all();
        },
        success: function(response) {
          self.is_initialized = true;

          Pride.AllDatastores.array = _.map(
            response['response'],
            function(datastore_data) {
              return new Pride.Datastore(datastore_data);
            }
          );

          self.success_functions.call_all();
        }
      });
    }
  }
};

Pride.init.success_functions = [];
Pride.init.failure_functions = [];

Pride.init.failure_functions.call_all = Pride.init.success_functions.call_all =
  function(func_array) {
    _.each(this, function(func) { func(); });
    this.length = 0;
    return this;
  };
