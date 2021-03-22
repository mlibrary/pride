import { expect } from 'chai';
import request from './request';

describe('request()', () => {
  it('returns a function', () => {
    expect(request).to.be.a('function');
  });
});
