import deepClone from './Util/deepClone';
import escape from './Util/escape';
import isDeepMatch from './Util/isDeepMatch';
import safeCall from './Util/safeCall';
import slice from './Util/slice';

const Util = {
  deepClone: (original) => deepClone(original),
  escape: (string) => escape(string),
  isDeepMatch: (object, pattern) => isDeepMatch(object, pattern),
  safeCall: (maybeFunc) => safeCall(maybeFunc),
  slice: (array, begin, end) => slice(array, begin, end)
};

export default Util;
