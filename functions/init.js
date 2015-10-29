var Pride = Pride || {};

Pride.init = function(on_success, on_failure, attempts_left) {
  if (!_.isNumber(attempts_left)) {
    attempts_left = Pride.settings.connection_attempts;
  }

  attempts_left -= 1;

  Pride.AllDatastores.update({
    success: on_success,
    failure: function() {
      if (attempts_left <= 0) {
        if (_.isFunction(on_failure)) { on_failure(); }
      } else {
        window.setTimeout(
          function() { Pride.init(on_success, on_failure, attempts_left); },
          Pride.settings.ms_between_attempts
        );
      }
    }
  });
};
