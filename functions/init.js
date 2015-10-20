var Pride = Pride || {};

Pride.init = function(on_success, on_failure, attempts_left) {
  attempts_left = attempts_left || Pride.settings.connection_attempts;

  Pride.AllDatastores.update({
    success: on_success,
    failure: function() {
      if (attempts_left === 0) {
        on_failure();
      } else {
        window.setTimeout(
          function() { Pride.init(on_success, on_failure, attempts_left - 1); },
          10000
        );
      }
    }
  });
};
