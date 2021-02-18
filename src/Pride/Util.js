import deepClone from './Util/deepClone';
import escape from './Util/escape';

const Util = {
  deepClone: (original) => deepClone(original),
  escape: (string) => escape(string)
};

export default Util;
