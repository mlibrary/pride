import isFunction from './isFunction';

// Perform a deep clone that leaves functions untouched.
const deepClone = function (original) {
  if (!original || isFunction(original)) {
    return original;
  }

  return JSON.parse(JSON.stringify(original));
};

export default deepClone;
