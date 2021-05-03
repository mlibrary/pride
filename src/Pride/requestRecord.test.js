import { expect } from 'chai';
import requestRecord from './requestRecord';

describe('requestRecord()', () => {
  it('works', () => {
    expect(requestRecord).to.not.be.null;
  });
  it('requires `source` argument', () => {
    expect(() => requestRecord()).to.throw("Cannot read property 'get' of undefined");
  });
});
