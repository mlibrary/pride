var Pride = Pride || {};

Pride.settings = {
  default_cache_size: 100,
  cache_size: {

  },

  connection_attempts: 5,
  ms_between_attempts: 1500,

  message_formats: {
    failed_record_load: 'Failed to load $1',
    failed_search_run:  'Failed to search $1'
  }
};
