// Perform a deep clone that leaves functions untouched.
const deepClone = function (original) {
  if (!original || typeof original === 'function') {
    return original;
  }

  return JSON.parse(JSON.stringify(original));
};

export default deepClone;
