// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.Search = function(setup) {
  var self = this;
  var base = new Pride.Core.SearchBase(setup, this);

  base.createItem = function(item_data) {
    return new Pride.Core.Record(item_data);
  };

  ////////////////////
  // Facet Searches //
  ////////////////////

  var facet_searches = [];
  var current_facets = [];

  this.getFacets = function() {
    return facet_searches;
  };

  //////////////////
  // Data Getters //
  //////////////////

  this.uid = base.datastore.get('uid');

  this.getData = function() {
    return {
             uid:             self.uid,
             metadata:        Pride.Util.deepClone(base.datastore.get('metadata')),
             sorts:           Pride.Util.deepClone(base.datastore.get('sorts')),
             selected_sort:   base.query.get('sort'),
             selected_facets: Pride.Util.deepClone(base.query.get('facets')),
             fields:          Pride.Util.deepClone(base.datastore.get('fields')),
             field_tree:      Pride.Util.deepClone(base.query.get('field_tree')),
             settings:        Pride.Util.deepClone(base.query.get('settings')),
             page:            base.query.get('page'),
             count:           base.query.get('count'),
             total_available: base.query.get('total_available'),
             total_pages:     base.query.get('total_pages'),
             page_limit:      base.query.get('page_limit')
           };
  };

  this.getResults = base.results;

  ///////////////////
  // Observerables //
  ///////////////////

  base.initialize_observables = function() {
    self.runDataObservers.add(function() {
      var facets = base.datastore.get('facets');

      if (!Pride.Util.isDeepMatch(current_facets, facets)) {
        _.each(facet_searches, function(facet_search) {
          facet_search.clearAllObservers();
        });

        facet_searches = _.map(
                           facets,
                           function(facet_data) {
                             return new Pride.Core.FacetSearch({
                               data:    _.omit(facet_data, 'values'),
                               results: facet_data.values
                             });
                           }
                         );

        current_facets = facets;

        self.facetsObservers.notify();
      }
    });
  };

  this.getMute = base.getMute;

  this.setMute = function(state) {
    _.each(facet_searches, function(facet) { facet.setMute(state); });
    base.setMute(state);

    return self;
  };

  this.resultsObservers = base.createObservable('results', this.getResults);
  this.setDataObservers = base.createObservable('setData', this.getData);
  this.runDataObservers = base.createObservable('runData', this.getData);
  this.facetsObservers  = base.createObservable('facets',  this.getFacets);
  this.muteObservers    = base.muteObservers;

  base.initialize_observables();
};
