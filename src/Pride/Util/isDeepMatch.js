import _ from 'underscore';

const isDeepMatch = function (object, pattern) {
  const both_arrays = _.isArray(object) && _.isArray(pattern);
  const both_objects = _.isObject(object) && _.isObject(pattern);

  if (both_arrays && pattern.length != object.length) {
    return false;
  }

  if (both_objects && _.keys(pattern).length != _.keys(object).length) {
    return false;
  }

  if (both_arrays || both_objects) {
    return _.every(pattern, function (value, key) {
      return isDeepMatch(object[key], value);
    });
  } else {
    return object === pattern;
  }
};

export default isDeepMatch;
