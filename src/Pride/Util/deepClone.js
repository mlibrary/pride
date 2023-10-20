import _ from 'underscore';

/*
  Future rewrite:
  return JSON.parse(JSON.stringify(original));
*/

// Perform a deep clone that leaves functions untouched.
const deepClone = function (original) {
  if (_.isFunction(original)) {
    return original;
  } else {
    let collectionFunction = false;

    if (_.isArray(original)) {
      collectionFunction = 'map';
    } else if (_.isObject(original)) {
      collectionFunction = 'mapObject';
    }

    if (collectionFunction) {
      return _[collectionFunction](
        original,
        function (item) {
          return deepClone(item);
        }
      );
    } else {
      return _.clone(original);
    }
  }
};

export default deepClone;
