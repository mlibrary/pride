import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import escape from './escape';

describe('escape()', () => {
  before(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
    global.document = dom.window.document;
  });
  it('encodes "&" properly', () => {
    expect(escape('&')).to.equal('&amp;');
  });
  it('encodes "<" properly', () => {
    expect(escape('<')).to.equal('&lt;');
  });
});
