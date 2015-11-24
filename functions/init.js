// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.core.init_request_buffer = new Pride.utils.RequestBuffer({
  url:             Pride.Settings.datastores_url,
  attempts:        Pride.Settings.init_attempts,
  failure_message: 'Failed to load datastores',
  edit_response:   function() { return undefined; },
  before_success:  function(response) {
    Pride.AllDatastores.array = _.map(
      response['response'],
      function(datastore_data) {
        return new Pride.core.Datastore(datastore_data);
      }
    );
  }
});

Pride.init = Pride.core.init_request_buffer.request;
