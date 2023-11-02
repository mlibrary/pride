import sliceCall from './sliceCall';
import isFunction from './isFunction';

const safeCall = function (maybeFunc) {
  if (isFunction(maybeFunc)) {
    return maybeFunc.apply(this, sliceCall(arguments, 1));
  }

  return maybeFunc;
};

export default safeCall;
