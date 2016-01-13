// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.Search = function(setup) {
  var self = this;
  var base = new Pride.Core.SearchBase(setup);

  base.createItem = function(item_data) {
    return new Pride.Core.Record(item_data);
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
                   var add_observer   = this.add;
                   var call_observers = this.call;

                   observables.push(this);
                   if (!never_mute) mutable_observables.push(this);

                   this.add = function(func) {
                     if (!muted || never_mute) func(data_func());

                     add_observer(func, 'observers');

                     return this;
                   };

                   this.notify = function() {
                     if (!muted || never_mute) {
                       data = data_func();
                       base.log('NOTIFY (' + name + ')', data);

                       call_observers('observers', data);
                     }

                     return this;
                   };
                 });

    base[name + 'Changed'] = object.notify;

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
    base.set(set_hash);

    return self;
  };

  this.run = function(cache_size) {
    base.run(cache_size);

    return self;
  };

  this.nextPage = function(cache_size) {
    var current_page = base.query.get('page');
    if (_.isNumber(current_page) && current_page < base.query.get('page_limit')) {
      self.set({page: current_page + 1});
      self.run(cache_size);
    }

    return self;
  };

  this.prevPage = function(cache_size) {
    var current_page = base.query.get('page');
    if (_.isNumber(current_page) && current_page > 1) {
      self.set({page: current_page - 1});
      self.run(cache_size);
    }

    return self;
  };
};
