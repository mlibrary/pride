import { expect } from 'chai';
import Settings from './Settings';

describe('Settings', () => {
  it('Settings.default_cache_size returns a number', () => {
    expect(Settings.default_cache_size).to.be.a('number');
  });
  it('Settings.cache_size returns an object', () => {
    expect(Settings.cache_size).to.be.an('object');
  });
  it('Settings.datastores_url returns a string', () => {
    expect(Settings.datastores_url).to.be.a('string');
  });
  it('Settings.connection_attempts returns a number', () => {
    expect(Settings.connection_attempts).to.be.a('number');
  });
  it('Settings.init_attempts returns a number', () => {
    expect(Settings.init_attempts).to.be.a('number');
  });
  it('Settings.ms_between_attempts returns a number', () => {
    expect(Settings.ms_between_attempts).to.be.a('number');
  });
  describe('message_formats', () => {
    it('returns an object', () => {
      expect(Settings.message_formats).to.be.an('object');
    });
    Object.keys(Settings.message_formats).forEach((key) => {
      it(`${key} returns a non-empty string`, () => {
        expect(Settings.message_formats[key]).to.be.a('string');
        expect(Settings.message_formats[key]).to.not.be.empty;
      });
    });
  });
  it('Settings.obnoxious returns a boolean', () => {
    expect(Settings.obnoxious).to.be.a('boolean');
  });
});
