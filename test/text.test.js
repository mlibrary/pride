import text from './text';
import { expect } from 'chai';

describe('This is a test', () => {
  it('should be a string', () => {
    expect(text).to.be.a('string');
  });
  it('should equal `Example`', () => {
    expect(text).to.equal('Example');
  });
});
