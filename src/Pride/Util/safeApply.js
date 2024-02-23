const safeApply = function (maybeFunc, ...args) {
  if (typeof maybeFunc === 'function') {
    return maybeFunc.apply(this, Array.isArray(args[0]) ? args[0] : args);
  }

  return maybeFunc;
};

export default safeApply;
