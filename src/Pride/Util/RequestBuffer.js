import _ from 'underscore';
import FuncBuffer from './FuncBuffer';
import request from './request';
import safeCall from './safeCall';
import Settings from '../Settings';

const RequestBuffer = function (requestOptions) {
  requestOptions = requestOptions || {};

  const funcBuffer = new FuncBuffer();

  let requestIssued = false;
  let requestSuccessful = false;
  let requestFailed = false;

  let cachedResponseData;

  this.request = function (funcHash) {
    funcBuffer.add(funcHash.success, 'success')
      .add(funcHash.failure, 'failure');

    if (requestIssued) {
      callWithResponse();
    } else {
      sendRequest();
    }

    return this;
  };

  const callWithResponse = function (data) {
    cachedResponseData = data || cachedResponseData;

    if (requestSuccessful) {
      callThenClear('success');
    } else if (requestFailed) {
      callThenClear('failure');
    }
  };

  const sendRequest = function () {
    requestIssued = true;

    request({
      url: safeCall(requestOptions.url),
      attempts: safeCall(requestOptions.attempts) ||
                       Settings.connection_attempts,
      failure_message: safeCall(requestOptions.failure_message),

      failure: function (error) {
        requestFailed = true;

        safeCall(requestOptions.before_failure, error);

        callWithResponse(error);

        safeCall(requestOptions.after_failure, error);
      },

      success: function (response) {
        requestSuccessful = true;

        safeCall(requestOptions.before_success, response);

        if (_.isFunction(requestOptions.edit_response)) {
          response = requestOptions.edit_response(response);
        }

        callWithResponse(response);

        safeCall(requestOptions.after_success, response);
      }
    });
  };

  const callThenClear = function (name) {
    funcBuffer.call(name, cachedResponseData)
      .clearAll();
  };
};

export default RequestBuffer;
