// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import { _ } from 'underscore';

Pride.init = new Pride.Util.RequestBuffer({
  url:             function() { return Pride.Settings.datastores_url; },
  attempts:        function() { return Pride.Settings.init_attempts; },
  failure_message: function() { return Pride.Messenger.preset('failed_init'); },

  edit_response:   function() { return undefined; },
  before_success:  function(data) {
    // TODO: Look for a better place for this later.
    Pride.Settings.default_institution = data.default_institution;
    Pride.Settings.affiliation = data.affiliation;
    Pride.AllDatastores.array = _.map(
      data.response,
      function(datastore_data) {
        return new Pride.Core.Datastore(datastore_data);
      }
    );
  }
}).request;
