import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import escape from '../../../src/Pride/Util/escape';

describe('escape()', () => {
  before(() => {
    const dom = new JSDOM();
    global.document = dom.window.document;
  });
  it('encodes "&" properly', () => {
    expect(escape('&')).to.equal('&amp;');
  });
  it('encodes "<" properly', () => {
    expect(escape('<')).to.equal('&lt;');
  });
});
