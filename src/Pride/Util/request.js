import log from '../Core/log';
import Settings from '../Settings';
import Messenger from '../Messenger';

const request = async (requestInfo) => {
  if (!requestInfo.url) throw new Error('No URL given to Pride.Util.request()');

  log('Request', 'Sending HTTP request...');
  log('Request', 'URL', requestInfo.url);
  log('Request', 'CONTENT', JSON.stringify(requestInfo.query));

  if (typeof requestInfo.attempts !== 'number') {
    requestInfo.attempts = Settings.connection_attempts;
  }

  requestInfo.attempts -= 1;

  try {
    const response = await fetch(requestInfo.url, {
      method: requestInfo.query ? 'post' : 'get',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestInfo.query),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json();
    log('Request', 'SUCCESS', responseData);

    requestInfo.success?.(responseData);

    Messenger.sendMessage({
      summary: requestInfo.success_message,
      class: 'success'
    });

    if (responseData.messages) {
      Messenger.sendMessageArray(responseData.messages);
    }
  } catch (error) {
    if (requestInfo.attempts <= 0) {
      log('Request', 'ERROR', error);

      requestInfo.failure?.(error);

      Messenger.sendMessage({
        summary: requestInfo.failure_message,
        class: 'error'
      });
    } else {
      log('Request', 'Trying request again...');
      setTimeout(() => {
        return request(requestInfo);
      }, Settings.ms_between_attempts);
    }
  }
};

export default request;
