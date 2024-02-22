const safeApply = function (maybeFunc, args) {
  if (typeof maybeFunc === 'function') {
    return maybeFunc.apply(this, args);
  }

  return maybeFunc;
};

export default safeApply;
