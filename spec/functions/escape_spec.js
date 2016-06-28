// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

function wrapText(string) {
  return 'foo' + string + 'bar';
}

function testEscaping(original, possible_1, possible_2) {
  it('encodes ' + original + ' properly', function() {
    var escaped = wrapText(Pride.Util.escape(original));
    expect(escaped == wrapText(possible_1) || escaped == wrapText(possible_2)).toBe(true);
  });
}

describe('escape()', function() {
  testEscaping('&', '&amp;', '&#38;');
  testEscaping('<', '&lt;',  '&#60;');
});
