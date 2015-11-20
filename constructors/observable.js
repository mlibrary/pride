// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

var Pride = Pride || {};

Pride.Observable = function(extention) {
  var observer_array = [];

  this.addObserver = function (func) {
    observer_array.push(func);

    return this;
  };

  this.removeObserver = function (removed_func) {
    observer_array = _.reject(observer_array, function(func) {
      return func == removed_func;
    });

    return this;
  };

  this.notifyObservers = function(message) {
    var func_args = arguments;

    _.each(observer_array, function(func) {
      func.apply(func, Array.prototype.slice.call(func_args));
    });

    return this;
  };

  if (_.isFunction(extention)) extention.call(this);
};
