/*
  cache_size:          Key-value pairs where each key is the UID of a
                       datastore, and the value gives the cache size for that
                       particular datastore.

  connection_attempts: How many times Pride will attempt an HTTP request
                       before giving up (overridden by some things such as
                       Pride.init()).

  datastores_url:      URL from which Pride can get all the possible
                       datastores.

  default_cache_size:  If a cache size isn't set for a datastore, this value
                       is used instead.

  init_attempts:       How many times Pride will attempt to initialize before
                       giving up.

  message_formats:     Key-value pairs where each key is the ID of a message
                       type and the value is what that message should say. A
                       dollar sign preceded by a number will be replaced when
                       the message is created.

  ms_between_attempts: How long Pride will wait to try another HTTP request
                       after one fails.

  obnoxious:           If true, debug messages will be logged to the console
                       as Pride runs. WARNING: Pride can send out a lot of
                       debug messages.
*/

const Settings = {
  cache_size: {},
  connection_attempts: 3,
  datastores_url: '',
  default_cache_size: 20,
  init_attempts: 3,
  message_formats: {
    failed_init: 'Failed to initialize Pride',
    failed_record_load: 'Failed to load $1',
    failed_search_run: 'Failed to search $1'
  },
  ms_between_attempts: 1500,
  obnoxious: false
};

export default Settings;
