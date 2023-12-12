import _ from 'underscore';
import MultiSearch from './MultiSearch';

const SearchSwitcher = function (currentSearch, cachedSearches) {
  currentSearch.setMute(false);
  currentSearch.set({ page: 1 });
  const searchCache = new MultiSearch(null, true, cachedSearches);
  searchCache.set({ page: 1 });

  this.uid = currentSearch.uid;

  this.run = (cacheSize) => {
    currentSearch.run(cacheSize);
    searchCache.run(0);

    return this;
  };

  this.set = (settings) => {
    currentSearch.set(settings);
    searchCache.set(_.omit(settings, 'page', 'facets'));
    return this;
  };

  this.nextPage = () => {
    currentSearch.nextPage();
    return this;
  };

  this.prevPage = () => {
    currentSearch.prevPage();
    return this;
  };

  this.switchTo = (requestedUid) => {
    if (requestedUid !== currentSearch) {
      currentSearch.setMute(true);
      currentSearch.set({ page: 1 });
      searchCache.searches.push(currentSearch);
      currentSearch = undefined;

      searchCache.searches = _.reject(
        searchCache.searches,
        (search) => {
          if (search.uid === requestedUid) {
            currentSearch = search;
            return true;
          }
        }
      );

      if (!currentSearch) {
        throw new Error('Could not find a search with a UID of: ' + requestedUid);
      }

      this.uid = currentSearch.uid;
      currentSearch.setMute(false);
    }

    return this;
  };
};

export default SearchSwitcher;
