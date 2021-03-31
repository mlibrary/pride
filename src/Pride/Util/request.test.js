import { expect } from 'chai';
import request from './request';

describe('request()', () => {
  it('is a function', () => {
    expect(request).to.be.a('function');
  });
  it('requires the argument to have a defined `url` property', () => {
    expect(() => request()).to.throw();
  });
});
