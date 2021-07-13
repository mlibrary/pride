import { expect } from 'chai';
import getPossibleKeys from '../../../../src/Pride/Util/Paginater/getPossibleKeys';

describe('getPossibleKeys()', () => {
  it('returns an array', () => {
    expect(getPossibleKeys()).to.be.an('array');
  });
  it('returns all possible keys', () => {
    expect(getPossibleKeys()).to.deep.equal([...getPossibleKeys()]);
  });
});
