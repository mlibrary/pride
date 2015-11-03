var Pride = Pride || {};

Pride.Messenger = new Pride.Observable(function() {
  this.sendMessage = function(message) {
    if (message['summary']) {
      message['class']   = message['class']   || 'info';
      message['details'] = message['details'] || '';

      this.notifyObservers(message);

      console.log('[messenger] MESSAGE SENT:', message)
    }

    return this;
  };

  this.sendMessageArray = function(message_array) {
    var messenger = this;

    _.each(
      message_array,
      function(message) { messenger.sendMessage(message); }
    );

    return this;
  };

  this.preset = function(type) {
    var variables = Array.prototype.slice.call(arguments);

    return Pride.settings
                .message_formats[type]
                .replace(
                  /(^|[^\\])\$(\d+)/,
                  function(match, previous_char, number) {
                    return previous_char + (variables[Number(number)] || '');
                  }
                )
                .replace('\\$', '$');
  };
});
