import FuncBuffer from './FuncBuffer';
import request from './request';
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
      url: typeof requestOptions.url === 'function' ? requestOptions.url.apply(this) : requestOptions.url,
      attempts: requestOptions.attempts?.apply(this) || Settings.connection_attempts,
      failure_message: requestOptions.failure_message?.apply(this),
      failure: function (error) {
        requestFailed = true;
        requestOptions.before_failure?.apply(this, [error]);
        callWithResponse(error);
        requestOptions.after_failure?.apply(this, [error]);
      },
      success: function (response) {
        requestSuccessful = true;
        requestOptions.before_success?.apply(this, [response]);
        if (typeof requestOptions.edit_response === 'function') {
          response = requestOptions.edit_response(response);
        }
        callWithResponse(response);
        requestOptions.after_success?.apply(this, [response]);
      }
    });
  };

  const callThenClear = function (name) {
    funcBuffer.call(name, cachedResponseData)
      .clearAll();
  };
};

export default RequestBuffer;
