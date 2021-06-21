import { expect } from 'chai';
import Messenger from './Messenger';

describe('Messenger()', () => {
  describe('safeGet()', () => {
    it('returns a function', () => {
      expect(Messenger.safeGet).to.be.a('function');
    });
  });
  describe('add()', () => {
    it('returns undefined', () => {
      expect(Messenger.add).to.be.undefined;
    });
  });
  describe('remove()', () => {
    it('returns undefined', () => {
      expect(Messenger.remove).to.be.undefined;
    });
  });
  describe('clear()', () => {
    it('returns undefined', () => {
      expect(Messenger.clear).to.be.undefined;
    });
  });
  describe('clearAll()', () => {
    it('returns a function', () => {
      expect(Messenger.clearAll).to.be.a('function');
    });
  });
  describe('apply()', () => {
    it('returns a function', () => {
      expect(Messenger.apply).to.be.a('function');
    });
  });
  describe('call()', () => {
    it('returns undefined', () => {
      expect(Messenger.call).to.be.undefined;
    });
  });
  describe('sendMessage()', () => {
    it('returns a function', () => {
      expect(Messenger.sendMessage).to.be.a('function');
    });
  });
  describe('sendMessageArray()', () => {
    it('returns a function', () => {
      expect(Messenger.sendMessageArray).to.be.a('function');
    });
  });
  describe('preset()', () => {
    it('returns a function', () => {
      expect(Messenger.preset).to.be.a('function');
    });
  });
});
