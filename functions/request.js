var Pride = Pride || {};

Pride.request = function(request_info) {
  console.log('[http request] URL: ', request_info.url);
  console.log('[http request] CONTENT:', JSON.stringify(request_info.query));

  var request_method = 'get';
  if (request_info.query) request_method = 'post';

  request_info.failure = request_info.failure || function() {};
  request_info.success = request_info.success || function() {};

  if (!_.isNumber(request_info.attempts)) {
    request_info.attempts = Pride.settings.connection_attempts;
  }
  request_info.attempts -= 1;

  reqwest({
    url:          request_info.url,
    data:         JSON.stringify(request_info.query),
    type:         'json',
    method:       request_method,
    contentType: 'application/json',

    error: function (error) {
      if (request_info.attempts <= 0) {
        console.log('[http request] Error!');

        if (request_info.failure_message) {
          Pride.Messenger.sendMessage({
            summary: request_info.failure_message,
            class:   'error'
          });
        }

        request_info.failure(error);
      } else {
        console.log('[http request] Trying request again...');
        window.setTimeout(
          function() { Pride.request(request_info); },
          Pride.settings.ms_between_attempts
        );
      }
    },

    success: function (response) {
      console.log('[http request] Success!');

      Pride.Messenger.sendMessageArray(response.messages);

      if (request_info.success_message) {
        Pride.Messenger.sendMessage({
          summary: request_info.success_message,
          class:   'success'
        });
      }

      request_info.success(response);
    }
  });
};
