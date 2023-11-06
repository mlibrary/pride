const { expect } = require('chai');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM()).window;

const symbols = [
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
];

describe('Pride.Util.escape()', function () {
  symbols.forEach((symbol) => {
    it(`encodes ${symbol.symbol} properly`, function () {
      // Copy code from ./src/Pride/Util/escape.js to define `document`
      const tempElement = document.createElement('div');
      tempElement.appendChild(document.createTextNode(symbol.symbol));
      expect(tempElement.innerHTML).to.equal(symbol.html);
    });
  });
});
