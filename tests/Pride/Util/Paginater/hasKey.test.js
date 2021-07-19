import { expect } from 'chai';
import getPossibleKeys from '../../../../src/Pride/Util/Paginater/getPossibleKeys';
import hasKey from '../../../../src/Pride/Util/Paginater/hasKey';

describe('hasKey()', function() {
  it('returns true when asked for any key that exists', () => {
    const allKeys = [...getPossibleKeys()];
    const hasAllKeys = allKeys.every((key) => hasKey(key));
    expect(hasAllKeys).to.be.true;
  });

  it('returns false when asked for a key that does not exist', () => {
    expect(hasKey('bloop')).to.be.false;
  });
});
