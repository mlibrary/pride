import _ from 'underscore';
import SearchBase from './SearchBase';
import Record from './Record';
import deepClone from '../Util/deepClone';
import isDeepMatch from '../Util/isDeepMatch';
import FacetSearch from './FacetSearch';

const DatastoreSearch = function (setup) {
  const self = this;
  const base = new SearchBase(setup, this);

  base.createItem = function (itemData) {
    return new Record(itemData);
  };

  /// /////////////////
  // Facet Searches //
  /// /////////////////

  let facetSearches = [];
  let currentFacets = [];

  this.getFacets = function () {
    return facetSearches;
  };

  /// ///////////////
  // Data Getters //
  /// ///////////////

  this.uid = base.datastore.get('uid');

  this.getData = function () {
    return {
      uid: self.uid,
      metadata: deepClone(base.datastore.get('metadata')),
      sorts: deepClone(base.datastore.get('sorts')),
      selected_sort: base.query.get('sort'),
      facets: deepClone(base.query.get('facets')),
      fields: deepClone(base.datastore.get('fields')),
      field_tree: deepClone(base.query.get('field_tree')),
      settings: deepClone(base.query.get('settings')),
      page: base.query.get('page'),
      count: base.query.get('count'),
      total_available: base.query.get('total_available'),
      total_pages: base.query.get('total_pages'),
      page_limit: base.query.get('page_limit'),
      specialists: deepClone(base.query.get('specialists'))
    };
  };

  this.getResults = base.results;

  /// ////////////////
  // Observerables //
  /// ////////////////

  base.initialize_observables = function () {
    self.runDataObservers.add(function () {
      const facets = base.datastore.get('facets');

      if (!isDeepMatch(currentFacets, facets)) {
        _.each(facetSearches, function (facetSearch) {
          facetSearch.clearAllObservers();
        });

        facetSearches = _.map(
          facets,
          function (facetData) {
            return new FacetSearch({
              data: _.omit(facetData, 'values'),
              results: facetData.values
            });
          }
        );

        currentFacets = facets;

        self.facetsObservers.notify();
      }
    });
  };

  this.getMute = base.getMute;

  this.setMute = function (state) {
    _.each(facetSearches, function (facet) {
      facet.setMute(state);
    });
    base.setMute(state);

    return self;
  };

  base.createObservable('facets', this.getFacets)
    .initialize_observables();
};

export default DatastoreSearch;
