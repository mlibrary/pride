// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.core.Search = function(setup) {
  var self  = this;
  var core  = new Pride.core.SearchCore(setup);

  core.createItem = function(item_data) {
    return new Pride.core.Record(item_data);
  };

  //////////////////
  // Data Getters //
  //////////////////

  this.getData = function() {
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

  this.getResults = function() {
    return core.results;
  };

  ////////////
  // Muting //
  ////////////

  var muted = false;

  this.setMute = function(state) {
    muted = state;
    self.muteObservers.notify();

    if (!muted) {
      this.resultsObservers.notify();
      this.setDataObservers.notify();
      this.runDataObservers.notify();
    }

    return self;
  };

  this.getMute = function() {
    return muted;
  };

  ///////////////////
  // Observerables //
  ///////////////////

  var createObservable = function(name, data, never_mute) {
    var object = new Pride.utils.Observable(function() {
                   var addObserver     = this.add;
                   var notifyObservers = this.notify;

                   this.add = function(func) {
                     if (!self.muted || never_mute) {
                       func(Pride.utils.safeCall(data));
                     }

                     addObserver(func);

                     return this;
                   };

                   this.notify = function() {
                     if (!self.muted || never_mute) {
                       console.log('[' + core.datastore.get('uid') + '] NOTIFY (' + name + ')')
                       notifyObservers(Pride.utils.safeCall(data));
                     }

                     return this;
                   };
                 });

    core[name + 'Changed'] = object.notify;

    return object;
  };

  this.clearAllObservers = function() {
    this.resultsObservers.clear();
    this.setDataObservers.clear();
    this.runDataObservers.clear();

    return self;
  };

  this.resultsObservers = createObservable('results', this.getData);
  this.setDataObservers = createObservable('setData', this.getResults);
  this.runDataObservers = createObservable('runData', this.getResults);
  this.muteObservers    = createObservable('runData', this.muted, true);

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
