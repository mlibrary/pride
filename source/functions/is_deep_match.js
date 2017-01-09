// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import { _ } from 'underscore';

Pride.Util.isDeepMatch = function(object, pattern) {
  var both_arrays  = _.isArray(object)  && _.isArray(pattern);
  var both_objects = _.isObject(object) && _.isObject(pattern);

  if (both_arrays  && pattern.length != object.length) {
    return false;
  }

  if (both_objects && _.keys(pattern).length != _.keys(object).length) {
    return false;
  }

  if (both_arrays || both_objects) {
    return _.every(pattern, function(value, key) {
             return Pride.Util.isDeepMatch(object[key], value);
           });
  } else {
    return object === pattern;
  }
};
