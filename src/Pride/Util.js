import deepClone from './Util/deepClone';
import escape from './Util/escape';
import isDeepMatch from './Util/isDeepMatch';
import Paginater from './Util/Paginater';
import RequestBuffer from './Util/RequestBuffer';
import safeApply from './Util/safeApply';
import safeCall from './Util/safeCall';
import slice from './Util/slice';

const Util = {
  deepClone: (original) => deepClone(original),
  escape: (string) => escape(string),
  isDeepMatch: (object, pattern) => isDeepMatch(object, pattern),
  safeApply: (maybeFunc, args) => safeApply(maybeFunc, args),
  safeCall: (maybeFunc) => safeCall(maybeFunc),
  slice: (array, begin, end) => slice(array, begin, end)
};

Object.defineProperty(Util, 'Paginater', { value: Paginater });
Object.defineProperty(Util, 'RequestBuffer', { value: RequestBuffer });

export default Util;
