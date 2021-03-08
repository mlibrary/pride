import { expect } from 'chai';
import requestRecord from './requestRecord';

describe.only('requestRecord()', () => {
  it('does a thing', () => {
    console.log(requestRecord);
    expect(requestRecord).to.not.be.null;
  });
});
