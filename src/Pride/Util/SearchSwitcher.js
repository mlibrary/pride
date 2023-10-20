import _ from 'underscore';
import MultiSearch from './MultiSearch';

const SearchSwitcher = function (currentSearch, cachedSearches) {
  const self = this;
  const searchCache = new MultiSearch(null, true, cachedSearches);

  currentSearch.set({ page: 1 }).setMute(false);
  searchCache.set({ page: 1 });

  this.uid = currentSearch.uid;

  this.run = function (cacheSize) {
    currentSearch.run(cacheSize);
    searchCache.run(0);

    return self;
  };

  this.set = function (settings) {
    currentSearch.set(settings);
    searchCache.set(_.omit(settings, 'page', 'facets'));

    return self;
  };

  this.nextPage = function () {
    currentSearch.nextPage();

    return self;
  };

  this.prevPage = function () {
    currentSearch.prevPage();

    return self;
  };

  this.switchTo = function (requestedUid) {
    if (requestedUid !== currentSearch) {
      currentSearch.setMute(true).set({ page: 1 });
      searchCache.searches.push(currentSearch);
      currentSearch = undefined;

      searchCache.searches = _.reject(
        searchCache.searches,
        function (search) {
          if (search.uid === requestedUid) {
            currentSearch = search;
            return true;
          }
        }
      );

      if (!currentSearch) {
        throw new Error('Could not find a search with a UID of: ' + requestedUid);
      }

      self.uid = currentSearch.uid;
      currentSearch.setMute(false);
    }

    return self;
  };
};

export default SearchSwitcher;
