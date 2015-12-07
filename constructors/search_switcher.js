// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.SearchSwitcher = function(current_search, cached_searches) {
  var self         = this;
  var search_cache = new Pride.Util.MultiSearch({}, true, cached_searches);

  current_search.setMute(false);

  this.run = function(cache_size) {
    current_search.run(cache_size);
    search_cache.run(0);

    return self;
  };

  this.set = function(settings) {
    current_search.set(settings);
    search_cache.set(settings);

    return self;
  };

  this.switchTo = function(requested_uid) {
    if (requested_uid != current_search) {
      current_search.setMute(true);
      search_cache.searches.push(current_search);
      current_search = undefined;

      search_cache.searches = _.reject(
                                  search_cache.searches,
                                  function(search) {
                                    if (search.uid == requested_uid) {
                                      current_search = search;
                                      return true;
                                    }
                                  }
                                );

      if (!current_search) {
        throw 'Could not find a search with a UID of: ' + requested_uid;
      }

      current_search.setMute(false);
    }

    return self;
  };
};
