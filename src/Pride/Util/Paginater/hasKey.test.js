import { expect } from 'chai';
import getPossibleKeys from './getPossibleKeys';
import hasKey from './hasKey';

describe('hasKey()', () => {
  it('returns true when asked for any key that exists', () => {
    const allKeys = [...getPossibleKeys()];
    const hasAllKeys = allKeys.every((key) => hasKey(key));
    expect(hasAllKeys).to.be.true;
  });

  it('returns false when asked for a key that does not exist', () => {
    expect(hasKey('bloop')).to.be.false;
  });
});
