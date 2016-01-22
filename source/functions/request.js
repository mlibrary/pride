// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.request = function(request_info) {
  Pride.Core.log('Request', 'Sending HTTP request...');
  Pride.Core.log('Request', 'URL', request_info.url);
  Pride.Core.log('Request', 'CONTENT', JSON.stringify(request_info.query));

  if (!request_info.url) throw 'No URL given to Pride.Util.request()';

  var request_method = 'get';
  if (request_info.query) request_method = 'post';

  if (!_.isNumber(request_info.attempts)) {
    request_info.attempts = Pride.Settings.connection_attempts;
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
        Pride.Core.log('Request', 'ERROR', error);

        Pride.Util.safeCall(request_info.failure, error);

        Pride.Messenger.sendMessage({
          summary: request_info.failure_message,
          class:   'error'
        });
      } else {
        Pride.Core.log('Request', 'Trying request again...');
        window.setTimeout(
          function() { Pride.Util.request(request_info); },
          Pride.Settings.ms_between_attempts
        );
      }
    },

    success: function (response) {
      Pride.Core.log('Request', 'SUCCESS', response);

      Pride.Util.safeCall(request_info.success, response);

      Pride.Messenger.sendMessage({
        summary: request_info.success_message,
        class:   'success'
      });

      Pride.Messenger.sendMessageArray(response.messages);
    }
  });
};
