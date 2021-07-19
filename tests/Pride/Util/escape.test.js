import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import escape from '../../../src/Pride/Util/escape';

describe('escape()', function() {
  const escapeExamples = [
    {
      symbol: '&',
      html: '&amp;'
    },
    {
      symbol: '<',
      html: '&lt;'
    }
  ];

  before(() => {
    const dom = new JSDOM();
    global.document = dom.window.document;
  });

  escapeExamples.forEach((escapeExample) => {
    it(`encodes '${escapeExample.symbol}' properly`, () => {
      expect(escape(escapeExample.symbol)).to.equal(escapeExample.html);
    });
  });
});
