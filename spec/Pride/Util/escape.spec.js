const { expect } = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const escape = require('../../../pride').Pride.Util.escape;
const { window } = new JSDOM('');
global.document = window.document;

describe('Pride.Util.escape()', function () {
  it('works', function () {
    expect(escape).to.not.be.null;
  });

  [
    {
      symbol: '&',
      html: '&amp;'
    },
    {
      symbol: '<',
      html: '&lt;'
    },
    {
      symbol: '>',
      html: '&gt;'
    }
  ].forEach((character) => {
    it(`encodes ${character.symbol} properly`, function () {
      expect(escape(character.symbol)).to.equal(character.html);
    });
  });
});
