var Pride = Pride || {};

Pride.init = function(on_success, on_failure, attempts) {
  Pride.AllDatastores.update({
    success:         on_success,
    failure:         on_failure,
    attempts:        attempts,
    failure_message: 'Failed to load datastores'
  });
};
