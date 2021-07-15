import { expect } from 'chai';
import Settings from '../../../src/Pride/Settings';

describe('Settings', () => {
  ['default_cache_size', 'connection_attempts', 'init_attempts', 'ms_between_attempts'].forEach((property) => {
    describe(property, () => {
      it('returns a number', () => {
        expect(Settings[property]).to.be.a('number');
      });
    });
  });

  ['cache_size', 'message_formats'].forEach((property) => {
    describe(property, () => {
      it('returns an object', () => {
        expect(Settings[property]).to.be.an('object');
      });

      Object.keys(Settings[property]).forEach((key) => {
        describe(key, () => {
          it('returns a non-empty string', () => {
            expect(Settings[property][key]).to.be.a('string');
            expect(Settings[property][key]).to.not.be.empty;
          });
        });
      });
    });
  });

  describe('datastores_url', () => {
    it('returns a string', () => {
      expect(Settings.datastores_url).to.be.a('string');
    });
  });

  describe('obnoxious', () => {
    it('returns a boolean', () => {
      expect(Settings.obnoxious).to.be.a('boolean');
    });
  });
});
