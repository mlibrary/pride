import { expect } from 'chai';
import RequestBuffer from './RequestBuffer';

describe('RequestBuffer()', () => {
  beforeEach(() => {
    this.requestBuffer = new RequestBuffer();
  });
  it('works', () => {
    expect(this.requestBuffer).to.not.be.null;
  });
  it('returns an object', () => {
    expect(this.requestBuffer).to.be.an('object');
  });
  describe('`request` property', () => {
    it('exists', () => {
      expect(this.requestBuffer).to.have.property('request');
    });
    it('returns a function', () => {
      expect(this.requestBuffer.request).to.be.a('function');
    });
  });
});
