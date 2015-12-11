// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.init = new Pride.Util.RequestBuffer({
  url:             function() { return Pride.Settings.datastores_url; },
  attempts:        function() { return Pride.Settings.init_attempts; },
  failure_message: function() { return Pride.Messenger.preset('failed_init'); },

  edit_response:   function() { return undefined; },
  before_success:  function(response) {
    Pride.AllDatastores.array = _.map(
      response['response'],
      function(datastore_data) {
        return new Pride.Core.Datastore(datastore_data);
      }
    );
  }
}).request;
