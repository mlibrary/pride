const isDeepMatch = function (object, pattern) {
  return JSON.stringify(object) === JSON.stringify(pattern);
};

export default isDeepMatch;
