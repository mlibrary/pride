import _ from 'underscore';

const safeApply = function(maybe_func, args) {
  if (_.isFunction(maybe_func)) {
    return maybe_func.apply(this, args);
  } else {
    return maybe_func;
  }
};

export default safeApply;
