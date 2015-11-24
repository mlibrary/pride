// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.core.Search = function(setup) {
  var self       = this;
  var core       = new Pride.core.SearchCore(setup);
  var facets     = Pride.utils.deepClone(core.datastore.get('facets'));
  var facet_data = Pride.utils.deepClone(core.datastore.get('facets'));

  //////////////////////
  // Setup Seach Core //
  //////////////////////

  core.createItem = function(item_data) {
    return new Pride.core.Record(item_data);
  };

  core.resultsChanged = function(single_func) {
    console.log('[' + core.datastore.get('uid') + '] UPDATED RESULTS')
    results_observers.notifyObservers(core.results());
  };

  core.setDataChanged = function(single_func) {
    console.log('[' + core.datastore.get('uid') + '] UPDATED SEARCH (SET)')
    set_data_observers.notifyObservers(searchData());
  };

  core.runDataChanged = function(single_func) {
    console.log('[' + core.datastore.get('uid') + '] UPDATED SEARCH (RUN)')
    run_data_observers.notifyObservers(searchData());

    var new_facet_data =  core.datastore.get('facets');

    if (!_.isMatch(facet_data, new_facet_data)) {
      facet_data = Pride.utils.deepClone(new_facet_data);
      facets     = Pride.utils.deepClone(new_facet_data);
    }
  };

  ///////////////
  // Observers //
  ///////////////

  var results_observers  = new Pride.utils.Observable();
  var set_data_observers = new Pride.utils.Observable();
  var run_data_observers = new Pride.utils.Observable();
  var facet_observers    = new Pride.utils.Observable();

  this.addResultsObserver = function(func) {
    results_observers.addObserver(func);
    func(core.results());

    return self;
  };

  this.addFacetsObserver = function(func) {
    facet_observers.addObserver(func);
    func(facets);

    return self;
  };

  this.addSetDataObserver = function(func) {
    set_data_observers.addObserver(func);
    func(searchData());

    return self;
  };

  this.addRunDataObserver = function(func) {
    run_data_observers.addObserver(func);
    func(searchData());

    return self;
  };

  var searchData = function() {
    return {
             uid:             core.datastore.get('uid'),
             metadata:        Pride.utils.deepClone(core.datastore.get('metadata')),
             sorts:           Pride.utils.deepClone(core.datastore.get('sorts')),
             current_sort:    core.query.get('sort'),
             facets:          Pride.utils.deepClone(core.query.get('facets')),
             fields:          Pride.utils.deepClone(core.datastore.get('fields')),
             field_tree:      Pride.utils.deepClone(core.query.get('field_tree')),
             settings:        Pride.utils.deepClone(core.query.get('settings')),
             page:            core.query.get('page'),
             count:           core.query.get('count'),
             total_available: core.query.get('total_available'),
             total_pages:     core.query.get('total_pages'),
             page_limit:      core.query.get('page_limit')
           };
  };

  /////////////////////////
  // Performing Searches //
  /////////////////////////

  this.set = function(set_hash) {
    core.set(set_hash);

    return self;
  };

  this.run = function(cache_size) {
    core.run(cache_size);

    return self;
  };

  this.nextPage = function() {
    var current_page = core.query.get('page');
    if (_.isNumber(current_page) && current_page < core.query.get('page_limit')) {
      self.set({page: current_page + 1});
      self.run();
    }

    return self;
  };

  this.prevPage = function() {
    var current_page = core.query.get('page');
    if (_.isNumber(current_page) && current_page > 1) {
      self.set({page: current_page - 1});
      self.run();
    }

    return self;
  };
};
