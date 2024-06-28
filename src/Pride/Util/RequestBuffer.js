import FuncBuffer from './FuncBuffer';
import request from './request';
import Settings from '../Settings';

const requestBuffer = (requestOptions = {}) => {
  const funcBuffer = new FuncBuffer();
  let requestIssued = false;

  const requestBufferInterface = {
    request: ({ failure, success }) => {
      funcBuffer.add(success, 'success').add(failure, 'failure');

      if (!requestIssued) {
        requestIssued = true;

        request({
          attempts: requestOptions.attempts?.() || Settings.connection_attempts,
          failure (error) {
            requestOptions.before_failure?.(error);
            funcBuffer.call('failure', error).clearAll();
            requestOptions.after_failure?.(error);
          },
          failure_message: requestOptions.failure_message?.(),
          success (res) {
            requestOptions.before_success?.(res);
            const response = requestOptions.edit_response instanceof Function
              ? requestOptions.edit_response(res)
              : res;
            funcBuffer.call('success', response).clearAll();
            requestOptions.after_success?.(response);
          },
          url: requestOptions.url instanceof Function ? requestOptions.url() : requestOptions.url
        });
      }

      return requestBufferInterface;
    }
  };

  return requestBufferInterface;
};

export default requestBuffer;
