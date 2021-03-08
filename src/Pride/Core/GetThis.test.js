import { expect } from 'chai';
import GetThis from './GetThis';

describe.only('GetThis()', () => {
  it('does a thing', () => {
    console.log(GetThis);
    expect(GetThis).to.not.be.null;
  });
});
