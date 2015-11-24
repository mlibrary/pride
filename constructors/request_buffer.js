// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.utils.RequestBuffer = function(request_options) {
  request_options = request_options || {};

  var success_functions = [];
  var failure_functions = [];

  var request_issued     = false;
  var request_successful = false;
  var request_failed     = false;

  var cached_response_data;

  this.request = function(func_hash) {
    success_functions.push(func_hash.success);
    failure_functions.push(func_hash.failure);

    if (request_issued) {
      callWithResponse();
    } else {
      sendRequest();
    }
  };

  var callWithResponse = function(data) {
    cached_response_data = cached_response_data || data;

    if (request_successful) {
      callAll(success_functions);
    } else if (request_failed) {
      callAll(failure_functions);
    }
  };

  var sendRequest = function() {
    request_issued = true;

    Pride.utils.request({
      url:             request_options.url,
      attempts:        request_options.attempts || Pride.Settings.connection_attempts,
      failure_message: request_options.failure_message,

      failure: function(error) {
        request_failed = true;

        Pride.utils.safeCall(request_options.before_failure, response);

        callWithResponse(error);

        Pride.utils.safeCall(request_options.after_failure, response);
      },
      success: function(response) {
        request_successful = true;

        Pride.utils.safeCall(request_options.before_success, response);

        if (_.isFunction(request_options.edit_response)) {
          response = request_options.edit_response(response);
        }

        callWithResponse(response);

        Pride.utils.safeCall(request_options.after_success, response);
      }
    });
  };

  var callAll = function(func_array) {
    _.each(func_array, function(func) {
      Pride.utils.safeCall(func, cached_response_data);
    });

    success_functions.length = 0;
    failure_functions.length = 0;
  };
};
