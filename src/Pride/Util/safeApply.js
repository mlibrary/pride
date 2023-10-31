import isFunction from './isFunction';

const safeApply = function (maybeFunc, args) {
  if (isFunction(maybeFunc)) {
    return maybeFunc.apply(this, args);
  }

  return maybeFunc;
};

export default safeApply;
