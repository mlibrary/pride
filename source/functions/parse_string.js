// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.FieldTree = Pride.FieldTree || {};

Pride.FieldTree.tokens = [':', 'AND', 'OR', '+', '-', '(', ')', '*', ' ', '\n', '\t', '\r'];

Pride.FieldTree.tokenize = function(string) {
  var result = [];
  var index  = 0;
  var type   = null;

  while (index < string.length) {
    var slice = string.slice(index);
    var found = _.find(
                  Pride.FieldTree.tokens,
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

