var Pride = Pride || {};

Pride.Search = function(setup) {
  var self       = this;
  var core       = new Pride.SearchCore(setup);
  var facets     = Pride.deepClone(core.datastore.get('facets'));
  var facet_data = Pride.deepClone(core.datastore.get('facets'));

  //////////////////////
  // Setup Seach Core //
  //////////////////////

  core.createItem = function(item_data) {
    return new Pride.Record(item_data);
  };

  core.resultsChanged = function(single_func) {
    console.log('[' + core.datastore.get('uid') + '] UPDATED RESULTS')
    results_observers.notifyObservers(core.results());
  };

  core.setDataChanged = function(single_func) {
    console.log('[' + core.datastore.get('uid') + '] UPDATED SEARCH (SET)')
    set_data_observers.notifyObservers(search_data());
  };

  core.runDataChanged = function(single_func) {
    console.log('[' + core.datastore.get('uid') + '] UPDATED SEARCH (RUN)')
    run_data_observers.notifyObservers(search_data());

    var new_facet_data =  core.datastore.get('facets');

    if (!_.isMatch(facet_data, new_facet_data)) {
      facet_data = Pride.deepClone(new_facet_data);
      facets     = Pride.deepClone(new_facet_data);
    }
  };

  ///////////////
  // Observers //
  ///////////////

  var results_observers  = new Pride.Observable();
  var set_data_observers = new Pride.Observable();
  var run_data_observers = new Pride.Observable();
  var facet_observers    = new Pride.Observable();

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
    func(search_data());

    return self;
  };

  this.addRunDataObserver = function(func) {
    run_data_observers.addObserver(func);
    func(search_data());

    return self;
  };

  var search_data = function() {
    return {
             uid:             core.datastore.get('uid'),
             metadata:        Pride.deepClone(core.datastore.get('metadata')),
             sorts:           Pride.deepClone(core.datastore.get('sorts')),
             current_sort:    core.query.get('sort'),
             facets:          Pride.deepClone(core.query.get('facets')),
             fields:          Pride.deepClone(core.datastore.get('fields')),
             field_tree:      Pride.deepClone(core.query.get('field_tree')),
             settings:        Pride.deepClone(core.query.get('settings')),
             page:            core.query.get('page'),
             count:           core.query.get('count'),
             total_available: core.query.get('total_available'),
             total_pages:     core.query.get('total_pages')
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
};
