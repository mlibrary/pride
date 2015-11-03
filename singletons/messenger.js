var Pride = Pride || {};

Pride.Messenger = new Pride.Observable(function() {
  this.sendMessage = function(a_summary, a_class, some_details) {
    this.notifyObservers({
      'class':   a_class      || 'info',
      'summary': a_summary    || '',
      'details': some_details || ''
    });

    return this;
  };

  this.sendMessageArray = function(message_array) {
    messenger = this;

    _.each(message_array, function(message) {
      messenger.notifyObservers(message);
    });

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
