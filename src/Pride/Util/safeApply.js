import { _ } from 'underscore';

export default function safeApply(maybeFunc, args) {
  if (_.isFunction(maybeFunc)) {
    return maybeFunc.apply(this, args);
  }

  return maybeFunc;
};
