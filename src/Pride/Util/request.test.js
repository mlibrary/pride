import { expect } from 'chai';
import request from './request';

describe('request()', () => {
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
