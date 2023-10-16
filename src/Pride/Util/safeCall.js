import _ from 'underscore';
import slice from './slice';

const safeCall = function(maybe_func) {
  if (_.isFunction(maybe_func)) {
    return maybe_func.apply(this, slice(arguments, 1));
  } else {
    return maybe_func;
  }
};

export default safeCall;
