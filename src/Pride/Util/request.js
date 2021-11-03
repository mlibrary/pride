import _ from 'underscore';
import reqwest from 'reqwest';
import log from '../Core/log';
import Messenger from '../Messenger';
import safeCall from './safeCall';
import Settings from '../Settings';

export default function request(requestInfo) {
  if (!requestInfo.url) throw new Error('No URL given to request()');

  log('Request', 'Sending HTTP request...');
  log('Request', 'URL', requestInfo.url);
  log('Request', 'CONTENT', JSON.stringify(requestInfo.query));

  if (!_.isNumber(requestInfo.attempts)) requestInfo.attempts = Settings.connection_attempts;
  requestInfo.attempts -= 1;

  reqwest({
    url: requestInfo.url,
    data: JSON.stringify(requestInfo.query),
    type: 'json',
    method: requestInfo.query ? 'post' : 'get',
    contentType: 'application/json',
    withCredentials: true,

    error: (error) => {
      if (requestInfo.attempts <= 0) {
        log('Request', 'ERROR', error);

        safeCall(requestInfo.failure, error);

        Messenger.sendMessage({
          summary: requestInfo.failure_message,
          class: 'error'
        });
      } else {
        log('Request', 'Trying request again...');
        window.setTimeout(
          () => request(requestInfo),
          Settings.ms_between_attempts
        );
      }
    },

    success: (response) => {
      log('Request', 'SUCCESS', response);

      safeCall(requestInfo.success, response);

      Messenger.sendMessage({
        summary: requestInfo.success_message,
        class: 'success'
      });

      Messenger.sendMessageArray(response.messages);
    }
  });
};
