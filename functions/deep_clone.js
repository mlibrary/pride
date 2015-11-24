// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

// Perform a deep clone that leaves functions untouched.
Pride.utils.deepClone = function(original) {
  if (_.isFunction(original)) {
    return original;
  } else {
    collection_function = false;

    if (_.isArray(original)) {
      collection_function = 'map';
    } else if (_.isObject(original)){
      collection_function = 'mapObject';
    }

    if (collection_function) {
      return _[collection_function](
               original,
               function(item) { return Pride.utils.deepClone(item); }
             );
    } else {
      return _.clone(original);
    }
  }
};
