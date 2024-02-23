import FuncBuffer from './FuncBuffer';
import request from './request';
import safeApply from './safeApply';
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
      url: safeApply(requestOptions.url),
      attempts: safeApply(requestOptions.attempts) ||
                       Settings.connection_attempts,
      failure_message: safeApply(requestOptions.failure_message),

      failure: function (error) {
        requestFailed = true;

        safeApply(requestOptions.before_failure, [error]);

        callWithResponse(error);

        safeApply(requestOptions.after_failure, [error]);
      },

      success: function (response) {
        requestSuccessful = true;

        safeApply(requestOptions.before_success, [response]);

        if (typeof requestOptions.edit_response === 'function') {
          response = requestOptions.edit_response(response);
        }

        callWithResponse(response);

        safeApply(requestOptions.after_success, [response]);
      }
    });
  };

  const callThenClear = function (name) {
    funcBuffer.call(name, cachedResponseData)
      .clearAll();
  };
};

export default RequestBuffer;
