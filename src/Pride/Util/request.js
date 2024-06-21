import log from '../Core/log';
import Messenger from '../Messenger';
import Settings from '../Settings';

const request = async (requestInfo) => {
  if (!requestInfo.url) {
    throw new Error('No URL given to Pride.Util.request()');
  }

  log('Request', 'Sending HTTP request...');
  log('Request', 'URL', requestInfo.url);
  log('Request', 'CONTENT', JSON.stringify(requestInfo.query));

  if (typeof requestInfo.attempts !== 'number') {
    requestInfo.attempts = Settings.connection_attempts;
  }

  requestInfo.attempts -= 1;

  try {
    const response = await fetch(requestInfo.url, {
      body: JSON.stringify(requestInfo.query),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: requestInfo.query ? 'post' : 'get'
    });

    const responseData = await response.json();

    log('Request', 'SUCCESS', responseData);

    requestInfo.success?.(responseData);

    Messenger.sendMessage({
      class: 'success',
      summary: requestInfo.success_message
    });

    if (responseData.messages) {
      Messenger.sendMessageArray(responseData.messages);
    }
  } catch (error) {
    if (requestInfo.attempts > 0) {
      log('Request', 'Trying request again...');

      setTimeout(() => {
        return request(requestInfo);
      }, Settings.ms_between_attempts);
    } else {
      log('Request', 'ERROR', error);

      requestInfo.failure?.(error);

      Messenger.sendMessage({
        class: 'error',
        summary: requestInfo.failure_message
      });
    }
  }
};

export default request;
