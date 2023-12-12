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
    const omittedSettings = { ...settings };
    ['page', 'facets'].forEach((property) => {
      delete omittedSettings[property];
    });
    searchCache.set(omittedSettings);
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
      currentSearch = searchCache.searches.find((search) => {
        return search.uid === requestedUid;
      });
      if (!currentSearch) {
        throw new Error(`Could not find a search with a UID of: ${requestedUid}`);
      }
      searchCache.searches = searchCache.searches.filter((search) => {
        return search.uid !== requestedUid;
      });
      this.uid = currentSearch.uid;
      currentSearch.setMute(false);
    }

    return this;
  };
};

export default SearchSwitcher;
