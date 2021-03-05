import { expect } from 'chai';
import log from './log';

describe.only('log()', () => {
  it('does a thing', () => {
    console.log(log);
    expect(log).to.not.be.null;
  });
});
