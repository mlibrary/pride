/* eslint no-control-regex: 0 */
import FieldTree from './FieldTree/index';

const Parser = (function () {
  'use strict';

  function peg$subclass (child, parent) {
    function Ctor () {
      this.constructor = child;
    }
    Ctor.prototype = parent.prototype;
    child.prototype = new Ctor();
  }

  function SyntaxError (message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = 'SyntaxError';

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SyntaxError);
    }
  }

  peg$subclass(SyntaxError, Error);

  SyntaxError.buildMessage = function (expected, found) {
    const DESCRIBE_EXPECTATION_FNS = {
      literal: function (expectation) {
        return '"' + literalEscape(expectation.text) + '"';
      },

      class: function (expectation) {
        let escapedParts = '';
        let i;

        for (i = 0; i < expectation.parts.length; i++) {
          escapedParts += expectation.parts[i] instanceof Array
            ? classEscape(expectation.parts[i][0]) + '-' + classEscape(expectation.parts[i][1])
            : classEscape(expectation.parts[i]);
        }

        return '[' + (expectation.inverted ? '^' : '') + escapedParts + ']';
      },

      any: function (expectation) {
        return 'any character';
      },

      end: function (expectation) {
        return 'end of input';
      },

      other: function (expectation) {
        return expectation.description;
      }
    };

    function hex (ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape (s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g, function (ch) {
          return '\\x0' + hex(ch);
        })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
          return '\\x' + hex(ch);
        });
    }

    function classEscape (s) {
      return s
        .replace(/\\/g, '\\\\')
        .replace(/\]/g, '\\]')
        .replace(/\^/g, '\\^')
        .replace(/-/g, '\\-')
        .replace(/\0/g, '\\0')
        .replace(/\t/g, '\\t')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/[\x00-\x0F]/g, function (ch) {
          return '\\x0' + hex(ch);
        })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
          return '\\x' + hex(ch);
        });
    }

    function describeExpectation (expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected (expected) {
      const descriptions = new Array(expected.length);
      let i; let j;

      for (i = 0; i < expected.length; i++) {
        descriptions[i] = describeExpectation(expected[i]);
      }

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + ' or ' + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(', ') +
            ', or ' +
            descriptions[descriptions.length - 1];
      }
    }

    function describeFound (found) {
      return found ? '"' + literalEscape(found) + '"' : 'end of input';
    }

    return 'Expected ' + describeExpected(expected) + ' but ' + describeFound(found) + ' found.';
  };

  function peg$parse (input, options) {
    options = options !== undefined ? options : {};

    const peg$FAILED = {};

    const peg$startRuleFunctions = { start: peg$parsestart };
    let peg$startRuleFunction = peg$parsestart;

    const peg$c0 = function (c) {
      return c;
    };
    const peg$c1 = function (cl, con, co) {
      return new FieldTree.FieldBoolean(con, cl, co);
    };
    const peg$c2 = function (first, rest) {
      if (rest) {
        return [first, rest];
      } else {
        return first;
      }
    };
    const peg$c3 = function (rest) {
      return rest;
    };
    const peg$c4 = ':';
    const peg$c5 = peg$literalExpectation(':', false);
    const peg$c6 = function (fieldName, list) {
      return new FieldTree.Field(fieldName, list);
    };
    const peg$c7 = function (list) {
      return new FieldTree.Field(defaultFieldName, list);
    };
    const peg$c8 = function (string) {
      return string.join('');
    };
    const peg$c9 = function (first, rest) {
      if (rest) {
        return first.concat(rest);
      } else {
        return first;
      }
    };
    const peg$c10 = function (first, rest) {
      return [new FieldTree.Literal(first + rest.join(''))];
    };
    const peg$c11 = function (string) {
      return [new FieldTree.Literal(string.join(''))];
    };
    const peg$c12 = function (literal) {
      return [new FieldTree.Literal('"' + literal.join('') + '"')];
    };
    const peg$c13 = function (conj) {
      return conj;
    };
    const peg$c14 = 'AND';
    const peg$c15 = peg$literalExpectation('AND', false);
    const peg$c16 = 'OR';
    const peg$c17 = peg$literalExpectation('OR', false);
    const peg$c18 = 'NOT';
    const peg$c19 = peg$literalExpectation('NOT', false);
    const peg$c20 = "'";
    const peg$c21 = peg$literalExpectation("'", false);
    const peg$c22 = /^[^']/;
    const peg$c23 = peg$classExpectation(["'"], true, false);
    const peg$c24 = '"';
    const peg$c25 = peg$literalExpectation('"', false);
    const peg$c26 = /^[^"]/;
    const peg$c27 = peg$classExpectation(['"'], true, false);
    const peg$c28 = /^[^ \t\r\n:'"()]/;
    const peg$c29 = peg$classExpectation([' ', '\t', '\r', '\n', ':', "'", '"', '(', ')'], true, false);
    const peg$c30 = /^[^ \t\r\n():]/;
    const peg$c31 = peg$classExpectation([' ', '\t', '\r', '\n', '(', ')', ':'], true, false);
    const peg$c32 = /^[^ \t\r\n'"():]/;
    const peg$c33 = peg$classExpectation([' ', '\t', '\r', '\n', "'", '"', '(', ')', ':'], true, false);
    const peg$c34 = /^[ \t\r\n]/;
    const peg$c35 = peg$classExpectation([' ', '\t', '\r', '\n'], false, false);

    let peg$currPos = 0;
    const peg$posDetailsCache = [{ line: 1, column: 1 }];
    let peg$maxFailPos = 0;
    let peg$maxFailExpected = [];
    let peg$silentFails = 0;

    if ('startRule' in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + '".');
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function peg$literalExpectation (text, ignoreCase) {
      return { type: 'literal', text, ignoreCase };
    }

    function peg$classExpectation (parts, inverted, ignoreCase) {
      return { type: 'class', parts, inverted, ignoreCase };
    }

    function peg$endExpectation () {
      return { type: 'end' };
    }

    function peg$computePosDetails (pos) {
      let details = peg$posDetailsCache[pos]; let p;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column
        };

        while (p < pos) {
          if (input.charCodeAt(p) === 10) {
            details.line++;
            details.column = 1;
          } else {
            details.column++;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation (startPos, endPos) {
      const startPosDetails = peg$computePosDetails(startPos);
      const endPosDetails = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail (expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildStructuredError (expected, found, location) {
      return new SyntaxError(
        SyntaxError.buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart () {
      let s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsecoordination();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseOPTSPACE();
        if (s2 !== peg$FAILED) {
          s1 = peg$c0(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsecoordination () {
      let s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parseclause();
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseconj();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecoordination();
              if (s5 !== peg$FAILED) {
                s1 = peg$c1(s1, s3, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseclauseList();
      }

      return s0;
    }

    function peg$parseclauseList () {
      let s0, s1, s2;

      s0 = peg$parseclause();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseclause();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseclauseRest();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s1 = peg$c2(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      }

      return s0;
    }

    function peg$parseclauseRest () {
      let s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseclauseList();
        if (s2 !== peg$FAILED) {
          s1 = peg$c3(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseclause () {
      let s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsefield();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s2 = peg$c4;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c5);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseliteralList();
          if (s3 !== peg$FAILED) {
            s1 = peg$c6(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseliteralList();
        if (s1 !== peg$FAILED) {
          s1 = peg$c7(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsefield () {
      let s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parseFIELDCHAR();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseFIELDCHAR();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s1 = peg$c8(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseliteralList () {
      let s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseliteral();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliteralRest();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s1 = peg$c9(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseliteralRest () {
      let s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseliteralList();
        if (s2 !== peg$FAILED) {
          s1 = peg$c3(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseliteral () {
      let s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      peg$silentFails++;
      s2 = peg$parseCONJ();
      peg$silentFails--;
      if (s2 === peg$FAILED) {
        s1 = undefined;
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseWORD();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseQWORD();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseQWORD();
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s1 = peg$c10(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parseCONJ();
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = undefined;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parseWORD();
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseWORD();
            }
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s1 = peg$c11(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseSQUOTE();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseNONSQUOTE();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseNONSQUOTE();
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseSQUOTE();
              if (s3 !== peg$FAILED) {
                s1 = peg$c12(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseDQUOTE();
            if (s1 !== peg$FAILED) {
              s2 = [];
              s3 = peg$parseNONDQUOTE();
              while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parseNONDQUOTE();
              }
              if (s2 !== peg$FAILED) {
                s3 = peg$parseDQUOTE();
                if (s3 !== peg$FAILED) {
                  s1 = peg$c12(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
        }
      }

      return s0;
    }

    function peg$parseconj () {
      let s0, s1;

      s0 = peg$currPos;
      s1 = peg$parseCONJ();
      if (s1 !== peg$FAILED) {
        s1 = peg$c13(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseCONJ () {
      let s0;

      if (input.substr(peg$currPos, 3) === peg$c14) {
        s0 = peg$c14;
        peg$currPos += 3;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c15);
        }
      }
      if (s0 === peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c16) {
          s0 = peg$c16;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c17);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c18) {
            s0 = peg$c18;
            peg$currPos += 3;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c19);
            }
          }
        }
      }

      return s0;
    }

    function peg$parseSQUOTE () {
      let s0;

      if (input.charCodeAt(peg$currPos) === 39) {
        s0 = peg$c20;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c21);
        }
      }

      return s0;
    }

    function peg$parseNONSQUOTE () {
      let s0;

      if (peg$c22.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c23);
        }
      }

      return s0;
    }

    function peg$parseDQUOTE () {
      let s0;

      if (input.charCodeAt(peg$currPos) === 34) {
        s0 = peg$c24;
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c25);
        }
      }

      return s0;
    }

    function peg$parseNONDQUOTE () {
      let s0;

      if (peg$c26.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c27);
        }
      }

      return s0;
    }

    function peg$parseFIELDCHAR () {
      let s0;

      if (peg$c28.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c29);
        }
      }

      return s0;
    }

    function peg$parseQWORD () {
      let s0;

      if (peg$c30.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c31);
        }
      }

      return s0;
    }

    function peg$parseWORD () {
      let s0;

      if (peg$c32.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c33);
        }
      }

      return s0;
    }

    function peg$parse_ () {
      let s0, s1;

      s0 = [];
      if (peg$c34.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c35);
        }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c34.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c35);
            }
          }
        }
      } else {
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseOPTSPACE () {
      let s0;

      s0 = peg$parse_();
      if (s0 === peg$FAILED) {
        s0 = null;
      }

      return s0;
    }

    const defaultFieldName = options.defaultFieldName || 'all_fields';

    // https://pegjs.org/online
    //
    // var Pride = function(){};
    // Pride.FieldTree = function(){};
    // Pride.FieldTree.Literal = function(str) {
    //   this.string =  str;
    //   function toString() {
    //     return string;
    //   }
    // }
    // Pride.FieldTree.Field = function(a,lst) {
    //   this.field = a; this.val = lst.map(function(x){return x.string}).join(" ");
    //   function toString() {
    //     return field + ":(" + lst.join(" ") + ")";
    //   }
    // }
    // Pride.FieldTree.FieldBoolean = function(a,b,c) { return [a, b, c];}

    const peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail(peg$endExpectation());
      }

      throw peg$buildStructuredError(
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError,
    parse: peg$parse
  };
})();

export default Parser;
