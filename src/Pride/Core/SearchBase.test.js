import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import SearchBase from './SearchBase';

describe.only('SearchBase()', () => {
  before(() => {
    const dom = new JSDOM();
    global.window = dom.window;
    this.searchBaseExample = new SearchBase();
  });
  it('works', () => {
    expect(SearchBase).to.not.be.null;
  });
  it('datastore()', () => {
    console.log(this.searchBaseExample);
    expect(this.searchBaseExample).to.not.be.null;
  });
});
