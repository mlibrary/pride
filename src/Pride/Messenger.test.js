import { expect } from 'chai';
import Messenger from './Messenger';

describe.only('Messenger()', () => {
  it('does a thing', () => {
    console.log(Messenger);
    expect(Messenger).to.not.be.null;
  });
});
