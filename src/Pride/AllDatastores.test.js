import { expect } from 'chai';
import AllDatastores from './AllDatastores';

describe.only('AllDatastores()', () => {
  it('does a thing', () => {
    console.log(AllDatastores);
    expect(AllDatastores).to.not.be.null;
  });
});
