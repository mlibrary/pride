// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Settings = {
  // default_cache_size: If a cache size isn't set for a datastore, this value
  //                     is used instead.
  // cache_size:         Key-value pairs where each key is the UID of a
  //                     datastore, and the value gives the cache size for that
  //                     particular datastore.
  default_cache_size: 100,
  cache_size: {

  },

  // datastore_url: URL from which Pride can get all the possible datastores.
  datastores_url: '',

  // connection_attempts: How many times Pride will attempt an HTTP request
  //                      before giving up.
  // ms_between_attempts: How long Pride will wait to try another HTTP request
  //                      after one fails.
  connection_attempts: 5,
  init_attempts:       3,
  ms_between_attempts: 1500,

  // message_formats: Key-value pairs where each key is the ID of a message type
  //                  and the value is what that message should say. A dollar
  //                  sign preceded by a number will be replaced when the
  //                  message is created.
  message_formats: {
    failed_record_load: 'Failed to load $1',
    failed_search_run:  'Failed to search $1'
  }
};
