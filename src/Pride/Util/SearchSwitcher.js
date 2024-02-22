import MultiSearch from './MultiSearch';

class SearchSwitcher {
  constructor (currentSearch, cachedSearches) {
    this.currentSearch = currentSearch;
    this.searchCache = new MultiSearch(null, true, cachedSearches);
    this.uid = currentSearch.uid;

    this._initializeSearches();
  }

  _initializeSearches () {
    this.currentSearch.setMute(false);
    this.currentSearch.set({ page: 1 });
    this.searchCache.set({ page: 1 });
  }

  run (cacheSize) {
    this.currentSearch.run(cacheSize);
    this.searchCache.run(0);
    return this;
  }

  set (settings) {
    this.currentSearch.set(settings);
    const omittedSettings = { ...settings };
    ['page', 'facets'].forEach((property) => {
      delete omittedSettings[property];
    });
    this.searchCache.set(omittedSettings);
    return this;
  }

  nextPage () {
    this.currentSearch.nextPage();
    return this;
  }

  prevPage () {
    this.currentSearch.prevPage();
    return this;
  }

  switchTo (requestedUid) {
    if (requestedUid !== this.currentSearch.uid) {
      this.currentSearch.setMute(true);
      this.currentSearch.set({ page: 1 });
      this.searchCache.searches.push(this.currentSearch);

      const newSearch = this.searchCache.searches.find((search) => {
        return search.uid === requestedUid;
      });
      if (!newSearch) {
        throw new Error(`Could not find a search with a UID of: ${requestedUid}`);
      }

      this.searchCache.searches = this.searchCache.searches.filter((search) => {
        return search.uid !== requestedUid;
      });
      this.currentSearch = newSearch;
      this.uid = this.currentSearch.uid;
      this.currentSearch.setMute(false);
    }

    return this;
  }
}

export default SearchSwitcher;
