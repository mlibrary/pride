// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

var Pride = Pride || {};

Pride.init_request_buffer = new Pride.RequestBuffer({
                              url:             Pride.settings.datastores_url,
                              attempts:        Pride.settings.init_attempts,
                              failure_message: 'Failed to load datastores',
                              edit_response:   function() { return undefined; },
                              before_success:  function(response) {
                                Pride.AllDatastores.array = _.map(
                                  response['response'],
                                  function(datastore_data) {
                                    return new Pride.Datastore(datastore_data);
                                  }
                                );
                              }
                            });

Pride.init = Pride.init_request_buffer.request;
