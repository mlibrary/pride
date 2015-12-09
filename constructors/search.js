// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.Search = function(setup) {
  var self = this;
  var core = new Pride.Core.SearchCore(setup);

  core.createItem = function(item_data) {
    return new Pride.Core.Record(item_data);
  };

  //////////////////
  // Data Getters //
  //////////////////

  this.uid = core.datastore.get('uid');

  this.getData = function() {
    return {
             uid:             self.uid,
             metadata:        Pride.Util.deepClone(core.datastore.get('metadata')),
             sorts:           Pride.Util.deepClone(core.datastore.get('sorts')),
             current_sort:    core.query.get('sort'),
             facets:          Pride.Util.deepClone(core.query.get('facets')),
             fields:          Pride.Util.deepClone(core.datastore.get('fields')),
             field_tree:      Pride.Util.deepClone(core.query.get('field_tree')),
             settings:        Pride.Util.deepClone(core.query.get('settings')),
             page:            core.query.get('page'),
             count:           core.query.get('count'),
             total_available: core.query.get('total_available'),
             total_pages:     core.query.get('total_pages'),
             page_limit:      core.query.get('page_limit')
           };
  };

  this.getResults = core.results;

  ///////////////////
  // Observerables //
  ///////////////////

  var muted               = false;
  var observables         = [];
  var mutable_observables = [];

  this.clearAllObservers = function() {
    _.each(observables, function(observable) {
      observable.clear();
    });

    return self;
  };

  this.setMute = function(state) {
    if (state != muted) {
      muted = state;
      self.muteObservers.notify();

      if (!muted) {
        _.each(mutable_observables, function(observable) {
          observable.notify();
        });
      }
    }

    return self;
  };

  this.getMute = function() {
    return muted;
  };

  var createObservable = function(name, data_func, never_mute) {
    var object = new Pride.Util.FuncBuffer(function() {
                   var addObserver     = this.add;
                   var notifyObservers = this.call;

                   this.call = undefined;

                   observables.push(this);
                   if (!never_mute) mutable_observables.push(this);

                   this.add = function(func) {
                     if (!muted || never_mute) func(data_func());

                     addObserver(func);

                     return this;
                   };

                   this.notify = function() {
                     if (!muted || never_mute) {
                       core.log('NOTIFY (' + name + ')', data_func());

                       notifyObservers(data_func());
                     }

                     return this;
                   };
                 });

    core[name + 'Changed'] = object.notify;

    return object;
  };

  this.resultsObservers = createObservable('results', this.getResults);
  this.setDataObservers = createObservable('setData', this.getData);
  this.runDataObservers = createObservable('runData', this.getData);
  this.muteObservers    = createObservable('mute',    this.getMute, true);

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

  this.nextPage = function(cache_size) {
    var current_page = core.query.get('page');
    if (_.isNumber(current_page) && current_page < core.query.get('page_limit')) {
      self.set({page: current_page + 1});
      self.run(cache_size);
    }

    return self;
  };

  this.prevPage = function(cache_size) {
    var current_page = core.query.get('page');
    if (_.isNumber(current_page) && current_page > 1) {
      self.set({page: current_page - 1});
      self.run(cache_size);
    }

    return self;
  };
};
