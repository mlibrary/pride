import _ from 'underscore';
import tokens from './tokens';

const tokenize = function (string) {
  const result = [];
  let index = 0;
  let type = null;

  while (index < string.length) {
    const slice = string.slice(index);
    let found = _.find(
      tokens,
      function (pattern) {
        return (new RegExp('^\\' + pattern)).exec(slice);
      }
    );

    if (found) {
      if (/\s/.exec(found)) {
        type = 'whitespace';
      }
      type = found;
      index += found.length;
    } else {
      found = string.charAt(index);
      type = 'string';
      index++;

      const last = _.last(result);

      if (last && last.type === 'string') {
        found = result.pop().content + found;
      }
    }

    result.push({ type, content: found });
  }

  return result;
};

export default tokenize;
