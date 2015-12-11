// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.SearchSwitcher = function(current_search, cached_searches) {
  var self         = this;
  var search_cache = new Pride.Util.MultiSearch(
                       '__pride_search_switcher__',
                       true,
                       cached_searches
                     );

  current_search.set({ page: 1 }).setMute(false);
  search_cache.set({ page: 1 });

  this.uid = current_search.uid;

  this.run = function(cache_size) {
    current_search.run(cache_size);
    search_cache.run(0);

    return self;
  };

  this.set = function(settings) {
    current_search.set(settings);
    search_cache.set(_.omit(settings, 'page'));

    return self;
  };

  this.nextPage = function() {
    current_search.nextPage();

    return self;
  };

  this.prevPage = function() {
    current_search.prevPage();

    return self;
  };

  this.switchTo = function(requested_uid) {
    if (requested_uid != current_search) {
      current_search.setMute(true).set({ page: 1 });
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


      self.uid = current_search.uid;
      current_search.setMute(false);
    }

    return self;
  };
};
