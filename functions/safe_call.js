// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

var Pride = Pride || {};

Pride.safeCall = function(func) {
  if (_.isFunction(func)) {
    return func.apply(this, Array.prototype.slice.call(arguments, 1));
  }
};
