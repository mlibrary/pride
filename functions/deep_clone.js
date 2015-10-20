var Pride = Pride || {};

// Perform a deep clone that leaves functions untouched.
Pride.deepClone = function(original) {
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
               function(item) { return Pride.deepClone(item); }
             );
    } else {
      return _.clone(original);
    }
  }
};
