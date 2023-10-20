import _ from 'underscore';

const safeApply = function (maybeFunc, args) {
  if (_.isFunction(maybeFunc)) {
    return maybeFunc.apply(this, args);
  } else {
    return maybeFunc;
  }
};

export default safeApply;
