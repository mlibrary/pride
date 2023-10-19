function wrapText (string) {
  return 'foo' + string + 'bar';
}

function testEscaping (original, possible_1, possible_2) {
  it('encodes ' + original + ' properly', function () {
    const escaped = wrapText(Pride.Util.escape(original));
    expect(escaped == wrapText(possible_1) || escaped == wrapText(possible_2)).to.be.true;
  });
}

describe('Pride.Util.escape()', function () {
  testEscaping('&', '&amp;', '&#38;');
  testEscaping('<', '&lt;', '&#60;');
});
