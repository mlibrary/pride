import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import request from '../../../src/Pride/Util/request';

describe('request()', () => {
  before(() => {
    const dom = new JSDOM();
    global.window = dom.window;
  });

  beforeEach(() => {
    // this.requestInfo = {
    //   url: 'http://localhost:3000'
    // };
    // this.requestExample = request(this.requestInfo);
  });

  it('works', () => {
    expect(request).to.not.be.null;
  });

  it('is a function', () => {
    expect(request).to.be.a('function');
  });

  it('requires the argument to have a defined `url` property', () => {
    expect(() => request()).to.throw();
  });
});
