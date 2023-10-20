import _ from 'underscore';

const isDeepMatch = function (object, pattern) {
  const bothArrays = _.isArray(object) && _.isArray(pattern);
  const bothObjects = _.isObject(object) && _.isObject(pattern);

  if (bothArrays && pattern.length !== object.length) {
    return false;
  }

  if (bothObjects && _.keys(pattern).length !== _.keys(object).length) {
    return false;
  }

  if (bothArrays || bothObjects) {
    return _.every(pattern, function (value, key) {
      return isDeepMatch(object[key], value);
    });
  } else {
    return object === pattern;
  }
};

export default isDeepMatch;
