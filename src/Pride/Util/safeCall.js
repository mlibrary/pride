import { _ } from 'underscore';
import slice from './slice';

export default function safeCall(maybeFunc) {
  if (_.isFunction(maybeFunc)) {
    return maybeFunc.apply(this, slice(arguments, 1));
  }

  return maybeFunc;
};
