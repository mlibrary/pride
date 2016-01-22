// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.Util.FuncBuffer = function(extension) {
  var buffer = {};
  var self   = this;

  var safeGet = function(name) {
    if (!_.has(buffer, name)) buffer[name] = [];

    return buffer[name];
  };

  this.add = function(func, name) {
    safeGet(name).push(func);

    return self;
  };

  this.remove = function(func, name) {
    buffer[name] = _.reject(
                     safeGet(name),
                     function(other_func) { return func == other_func; }
                   );

    return self;
  };

  this.clear = function(name) {
    delete buffer[name];

    return self;
  };

  this.clearAll = function() {
    buffer = {};

    return self;
  };

  this.call = function(name) {
    self.apply(name, Pride.Util.slice(arguments, 1));

    return self;
  };

  this.apply = function(name, args) {
    _.each(safeGet(name), function(func) { Pride.Util.safeApply(func, args); });

    return self;
  };

  if (_.isFunction(extension)) extension.call(this);
};
