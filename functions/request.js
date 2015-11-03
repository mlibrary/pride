var Pride = Pride || {};

Pride.request = function(request_info) {
  var request_method = 'get';

  if (request_info.query) request_method = 'post';

  request_info.failure = request_info.failure || function() {};
  request_info.success = request_info.success || function() {};

  console.log('[http request] URL: ', request_info.url);
  console.log('[http request] CONTENT:', JSON.stringify(request_info.query));

  reqwest({
    url:          request_info.url,
    data:         JSON.stringify(request_info.query),
    type:         'json',
    method:       request_method,
    contentType: 'application/json',

    error: function (error) {
      console.log('Error!');


      if (request_info.failure_message) {
        Pride.Messenger.sendMessage({
          summary: request_info.failure_message,
          class:   'error'
        });
      }

      request_info.failure(error);
    },

    success: function (response) {
      console.log('Success!');

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
