import { expect } from 'chai';
import init from './init';

describe('init()', function() {
  it('works', () => {
    expect(init).to.not.be.null;
  });

  it('is a function', () => {
    expect(init).to.be.a('function');
  });

  it('requires the argument to have a defined `url` property', () => {
    expect(() => init({})).to.throw('No URL given to request()');
  });
});
