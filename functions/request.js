var Pride = Pride || {};

Pride.request = function(request_info) {
  var request_method = 'get';

  if (request_info.query) {
    request_method = 'post';
  }

  console.log('*** HTTP REQUEST ***********************');
  console.log('  URL:    ', request_info.url);
  console.log('  CONTENT:', JSON.stringify(request_info.query));
  console.log('****************************************');

  reqwest({
    url:          request_info.url,
    data:         JSON.stringify(request_info.query),
    type:         'json',
    method:       request_method,
    contentType: 'application/json',

    error: function (error) {
      console.log('Error!');


      if (request_info.failure_message) {
        Pride.Messenger.sendMessage(
          request_info.failure_message,
          'error'
        );
      }

      if (_.isFunction(request_info.failure)) {
        request_info.failure(error);
      }
    },

    success: function (response) {
      console.log('Success!');

      Pride.Messenger.sendMessageArray(response.messages);

      if (request_info.success_message) {
        Pride.Messenger.sendMessage(
          request_info.success_message,
          'success'
        );
      }

      if (_.isFunction(request_info.success)) {
        request_info.success(response);
      }
    }
  });
};
