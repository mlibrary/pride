import { expect } from 'chai';
import Datastore from './Datastore';

describe.only('Datastore()', () => {
  it('does a thing', () => {
    console.log(Datastore);
    expect(Datastore).to.not.be.null;
  });
});
