import FuncBuffer from './FuncBuffer';
import request from './request';
import Settings from '../Settings';

class RequestBuffer {
  #funcBuffer;
  #requestIssued = false;
  #requestSuccessful = false;
  #requestFailed = false;
  #cachedResponseData;
  requestOptions;

  constructor (requestOptions = {}) {
    this.#funcBuffer = new FuncBuffer();
    this.requestOptions = requestOptions;
  }

  request = (funcHash) => {
    this.#funcBuffer.add(funcHash.success, 'success')
      .add(funcHash.failure, 'failure');

    if (this.#requestIssued) {
      this.#callWithResponse();
    } else {
      this.#sendRequest();
    }

    return this;
  };

  #callWithResponse = (data) => {
    this.#cachedResponseData = data ?? this.#cachedResponseData;
    if (this.#requestSuccessful) {
      this.#callThenClear('success');
    } else if (this.#requestFailed) {
      this.#callThenClear('failure');
    }
  };

  #sendRequest = () => {
    this.#requestIssued = true;

    const requestOptions = this.requestOptions;

    request({
      url: typeof requestOptions.url === 'function'
        ? requestOptions.url()
        : requestOptions.url,
      attempts: requestOptions.attempts?.() || Settings.connection_attempts,
      failure_message: requestOptions.failure_message?.(),
      failure: (error) => {
        this.#requestFailed = true;
        requestOptions.before_failure?.(error);
        this.#callWithResponse(error);
        requestOptions.after_failure?.(error);
      },
      success: (response) => {
        this.#requestSuccessful = true;
        requestOptions.before_success?.(response);
        response = typeof requestOptions.edit_response === 'function'
          ? requestOptions.edit_response(response)
          : response;
        this.#callWithResponse(response);
        requestOptions.after_success?.(response);
      }
    });
  };

  #callThenClear = (name) => {
    this.#funcBuffer.call(name, this.#cachedResponseData)
      .clearAll();
  };
}

export default RequestBuffer;
