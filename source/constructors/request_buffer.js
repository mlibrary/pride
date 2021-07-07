// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import _ from 'underscore';

Pride.Util.RequestBuffer = function(request_options) {
  request_options = request_options || {};

  var func_buffer = new Pride.Util.FuncBuffer();

  var request_issued     = false;
  var request_successful = false;
  var request_failed     = false;

  var cached_response_data;

  this.request = function(func_hash) {
    func_buffer.add(func_hash.success, 'success')
               .add(func_hash.failure, 'failure');

    if (request_issued) {
      callWithResponse();
    } else {
      sendRequest();
    }

    return this;
  };

  var callWithResponse = function(data) {
    cached_response_data = data || cached_response_data;

    if (request_successful) {
      callThenClear('success');
    } else if (request_failed) {
      callThenClear('failure');
    }
  };

  var sendRequest = function() {
    request_issued = true;

    Pride.Util.request({
      url:             Pride.Util.safeCall(request_options.url),
      attempts:        Pride.Util.safeCall(request_options.attempts) ||
                       Pride.Settings.connection_attempts,
      failure_message: Pride.Util.safeCall(request_options.failure_message),

      failure: function(error) {
        request_failed = true;

        Pride.Util.safeCall(request_options.before_failure, error);

        callWithResponse(error);

        Pride.Util.safeCall(request_options.after_failure, error);
      },

      success: function(response) {
        request_successful = true;

        Pride.Util.safeCall(request_options.before_success, response);

        if (_.isFunction(request_options.edit_response)) {
          response = request_options.edit_response(response);
        }

        callWithResponse(response);

        Pride.Util.safeCall(request_options.after_success, response);
      }
    });
  };

  var callThenClear = function(name) {
    func_buffer.call(name, cached_response_data)
               .clearAll();
  };
};
