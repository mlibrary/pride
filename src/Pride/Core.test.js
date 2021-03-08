import { expect } from 'chai';
import Core from './Core';

describe.only('Core()', () => {
  it('does a thing', () => {
    console.log(Core);
    expect(Core).to.not.be.null;
  });
});
