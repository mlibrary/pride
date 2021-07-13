import { expect } from 'chai';
import Settings from './Settings';

describe('Settings', () => {
  ['default_cache_size', 'connection_attempts', 'init_attempts', 'ms_between_attempts'].forEach((property) => {
    describe(property, () => {
      it('returns a number', () => {
        expect(Settings[property]).to.be.a('number');
      });
    });
  });
  describe('cache_size', () => {
    it('returns an object', () => {
      expect(Settings.cache_size).to.be.an('object');
    });
  });
  describe('datastores_url', () => {
    it('returns a string', () => {
      expect(Settings.datastores_url).to.be.a('string');
    });
  });
  describe('message_formats', () => {
    it('returns an object', () => {
      expect(Settings.message_formats).to.be.an('object');
    });
    Object.keys(Settings.message_formats).forEach((key) => {
      describe(key, () => {
        it('returns a non-empty string', () => {
          expect(Settings.message_formats[key]).to.be.a('string');
          expect(Settings.message_formats[key]).to.not.be.empty;
        });
      });
    });
  });
  describe('obnoxious', () => {
    it('returns a boolean', () => {
      expect(Settings.obnoxious).to.be.a('boolean');
    });
  });
});
