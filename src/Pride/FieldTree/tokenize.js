import _ from 'underscore';
import tokens from './tokens';

const tokenize = function(string) {
  var result = [];
  var index  = 0;
  var type   = null;

  while (index < string.length) {
    var slice = string.slice(index);
    var found = _.find(
                  tokens,
                  function(pattern) {
                    return (new RegExp('^\\' + pattern)).exec(slice);
                  }
                );



    if (found) {
      if (/\s/.exec(found)) {
        type = 'whitespace';
      }
      type   = found;
      index += found.length;
    } else {
      found = string.charAt(index);
      type  = 'string';
      index++;

      var last = _.last(result);

      if (last && last.type == 'string') {
        found = result.pop().content + found;
      }
    }

    result.push({ type: type, content: found });
  }

  return result;
};

export default tokenize;
