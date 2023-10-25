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
  }
];

function testEscaping (character) {
  it(`encodes ${character.symbol} properly`, function () {
    const tempElement = document.createElement('div');
    tempElement.appendChild(document.createTextNode(character.symbol));
    expect(tempElement.innerHTML).to.equal(character.html);
  });
};

describe('Pride.Util.escape()', function () {
  symbols.forEach((symbol) => {
    testEscaping(symbol);
  });
});
