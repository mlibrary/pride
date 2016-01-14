// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Core.FacetSearch = function(setup) {
  example_facet = this;
  var data    = setup.data;
  var results = setup.results;

  //////////////////
  // Data Getters //
  //////////////////

  this.uid        = data.uid;
  this.getData    = function() { return data; };
  this.getResults = function() { return results; };

  ////////////
  // Muting //
  ////////////

  var muted = false;

  this.getMute = function() { return muted; };

  this.setMute = function(state) {
    muted = state;

    return self;
  };

  ///////////////////
  // Observerables //
  ///////////////////

  var observables = [];

  this.clearAllObservers = function() {
    _.each(observables, function(observable) {
      observable.clearAll();
    });

    return self;
  };

var createObservable = function(name, data_func) {
    var object = new Pride.Util.FuncBuffer(function() {
                   var add_observer   = this.add;
                   var call_observers = this.call;

                     observables.push(this);

                   this.add = function(func) {
                     if (!self.muted) func(data_func());

                     add_observer(func, 'observers');

                     return this;
                   };

                   this.notify = function() {
                     if (!self.muted) {
                       data = data_func();
                       self.log('NOTIFY (' + name + ')', data);

                       call_observers('observers', data);
                     }

                     return this;
                   };
                 });

    return object;
  };

  this.resultsObservers = createObservable('results', this.getResults);
  this.setDataObservers = createObservable('setData', this.getData);
  this.runDataObservers = createObservable('runData', this.getData);
};
