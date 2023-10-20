import _ from 'underscore';
import slice from './slice';

const safeCall = function (maybeFunc) {
  if (_.isFunction(maybeFunc)) {
    return maybeFunc.apply(this, slice(arguments, 1));
  } else {
    return maybeFunc;
  }
};

export default safeCall;
