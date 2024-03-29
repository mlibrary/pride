import reqwest from 'reqwest';
import log from '../Core/log';
import Settings from '../Settings';
import Messenger from '../Messenger';

const request = function (requestInfo) {
  log('Request', 'Sending HTTP request...');
  log('Request', 'URL', requestInfo.url);
  log('Request', 'CONTENT', JSON.stringify(requestInfo.query));

  if (!requestInfo.url) throw new Error('No URL given to Pride.Util.request()');

  let requestMethod = 'get';
  if (requestInfo.query) requestMethod = 'post';

  if (typeof requestInfo.attempts !== 'number') {
    requestInfo.attempts = Settings.connection_attempts;
  }

  requestInfo.attempts -= 1;

  reqwest({
    url: requestInfo.url,
    data: JSON.stringify(requestInfo.query),
    type: 'json',
    method: requestMethod,
    contentType: 'application/json',
    withCredentials: true,

    error: function (error) {
      if (requestInfo.attempts <= 0) {
        log('Request', 'ERROR', error);

        requestInfo.failure?.(error);

        Messenger.sendMessage({
          summary: requestInfo.failure_message,
          class: 'error'
        });
      } else {
        log('Request', 'Trying request again...');
        window.setTimeout(() => {
          return request(requestInfo);
        }, Settings.ms_between_attempts);
      }
    },

    success: function (response) {
      log('Request', 'SUCCESS', response);

      requestInfo.success?.(response);

      Messenger.sendMessage({
        summary: requestInfo.success_message,
        class: 'success'
      });

      Messenger.sendMessageArray(response.messages);
    }
  });
};

export default request;
