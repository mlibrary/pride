import FuncBuffer from './FuncBuffer';
import request from './request';
import Settings from '../Settings';

const requestBuffer = (requestOptions = {}) => {
  const funcBuffer = new FuncBuffer();
  let requestIssued = false;
  let requestSuccessful = false;
  let requestFailed = false;
  let cachedResponseData = null;

  const callThenClear = (name) => {
    funcBuffer.call(name, cachedResponseData).clearAll();
  };

  const callWithResponse = (data) => {
    cachedResponseData = data || cachedResponseData;
    if (requestSuccessful) {
      callThenClear('success');
    } else if (requestFailed) {
      callThenClear('failure');
    }
  };

  const sendRequest = () => {
    requestIssued = true;

    request({
      attempts: requestOptions.attempts?.() || Settings.connection_attempts,
      failure (error) {
        requestFailed = true;
        requestOptions.before_failure?.(error);
        callWithResponse(error);
        requestOptions.after_failure?.(error);
      },
      failure_message: requestOptions.failure_message?.(),
      success (res) {
        let response = res;
        requestSuccessful = true;
        requestOptions.before_success?.(response);
        if (typeof requestOptions.edit_response === 'function') {
          response = requestOptions.edit_response(response);
        }
        callWithResponse(response);
        requestOptions.after_success?.(response);
      },
      url: typeof requestOptions.url === 'function' ? requestOptions.url() : requestOptions.url
    });
  };

  const requestInterface = {
    request: (funcHash) => {
      funcBuffer.add(funcHash.success, 'success').add(funcHash.failure, 'failure');

      if (requestIssued) {
        callWithResponse();
      } else {
        sendRequest();
      }

      return requestInterface;
    }
  };

  return requestInterface;
};

export default requestBuffer;
