import _ from 'underscore';
import sliceCall from './sliceCall';

const safeCall = function (maybeFunc) {
  if (_.isFunction(maybeFunc)) {
    return maybeFunc.apply(this, sliceCall(arguments, 1));
  } else {
    return maybeFunc;
  }
};

export default safeCall;
