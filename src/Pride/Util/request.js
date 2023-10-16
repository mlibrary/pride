import _ from 'underscore';
import reqwest from 'reqwest';
import log from '../Core/log';
import Settings from '../Settings';
import safeCall from './safeCall';
import Messenger from '../Messenger';

const request = function(request_info) {
  log('Request', 'Sending HTTP request...');
  log('Request', 'URL', request_info.url);
  log('Request', 'CONTENT', JSON.stringify(request_info.query));

  if (!request_info.url) throw 'No URL given to Pride.Util.request()';

  var request_method = 'get';
  if (request_info.query) request_method = 'post';

  if (!_.isNumber(request_info.attempts)) {
    request_info.attempts = Settings.connection_attempts;
  }

  request_info.attempts -= 1;

  reqwest({
    url:             request_info.url,
    data:            JSON.stringify(request_info.query),
    type:            'json',
    method:          request_method,
    contentType:     'application/json',
    withCredentials: true,

    error: function (error) {
      if (request_info.attempts <= 0) {
        log('Request', 'ERROR', error);

        safeCall(request_info.failure, error);

        Messenger.sendMessage({
          summary: request_info.failure_message,
          class:   'error'
        });
      } else {
        log('Request', 'Trying request again...');
        window.setTimeout(
          function() { request(request_info); },
          Settings.ms_between_attempts
        );
      }
    },

    success: function (response) {
      log('Request', 'SUCCESS', response);

      safeCall(request_info.success, response);

      Messenger.sendMessage({
        summary: request_info.success_message,
        class:   'success'
      });

      Messenger.sendMessageArray(response.messages);
    }
  });
};

export default request;
