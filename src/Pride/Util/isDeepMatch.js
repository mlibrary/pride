import { _ } from 'underscore';

export default function isDeepMatch(object, pattern) {
  const bothArrays = _.isArray(object) && _.isArray(pattern);
  const bothObjects = _.isObject(object) && _.isObject(pattern);

  if (
    (bothArrays && pattern.length !== object.length) ||
    (bothObjects && _.keys(pattern).length !== _.keys(object).length)
  ) {
    return false;
  }

  if (bothArrays || bothObjects) {
    return _.every(
      pattern,
      (value, key) => isDeepMatch(object[key], value)
    );
  }

  return object === pattern;
};
