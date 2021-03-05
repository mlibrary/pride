import { expect } from 'chai';
import request from './request';

describe.only('request()', () => {
  it('does a thing', () => {
    console.log(request);
    expect(request).to.not.be.null;
  });
});
