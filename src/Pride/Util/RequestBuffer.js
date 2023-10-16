import _ from 'underscore';
import FuncBuffer from './FuncBuffer';
import request from './request';
import safeCall from './safeCall';
import Settings from '../Settings';

const RequestBuffer = function(request_options) {
  request_options = request_options || {};

  var func_buffer = new FuncBuffer();

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

    request({
      url:             safeCall(request_options.url),
      attempts:        safeCall(request_options.attempts) ||
                       Settings.connection_attempts,
      failure_message: safeCall(request_options.failure_message),

      failure: function(error) {
        request_failed = true;

        safeCall(request_options.before_failure, error);

        callWithResponse(error);

        safeCall(request_options.after_failure, error);
      },

      success: function(response) {
        request_successful = true;

        safeCall(request_options.before_success, response);

        if (_.isFunction(request_options.edit_response)) {
          response = request_options.edit_response(response);
        }

        callWithResponse(response);

        safeCall(request_options.after_success, response);
      }
    });
  };

  var callThenClear = function(name) {
    func_buffer.call(name, cached_response_data)
               .clearAll();
  };
};

export default RequestBuffer;
