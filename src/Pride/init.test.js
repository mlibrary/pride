import { expect } from 'chai';
import init from './init';

describe.only('init()', () => {
  it('does a thing', () => {
    console.log(init);
    expect(init).to.not.be.null;
  });
});
