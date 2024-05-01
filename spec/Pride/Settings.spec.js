const { expect } = require('chai');
const Settings = require('../../pride').Pride.Settings;

describe('Pride.Settings', function () {
  it('works', function () {
    expect(Settings).to.not.be.null;
  });

  it('is a non-empty object', function () {
    expect(Settings).to.be.an('object');
    expect(Settings).to.not.be.empty;
  });

  describe('properties', function () {
    it('Settings.cache_size returns an object', function () {
      expect(Settings.cache_size).to.be.an('object');
    });
    ['connection_attempts', 'default_cache_size', 'init_attempts', 'ms_between_attempts'].forEach((property) => {
      it(`Settings.${property} returns a number`, function () {
        expect(Settings[property]).to.be.a('number');
      });
    });
    ['datastores_url', 'message_formats.failed_init', 'message_formats.failed_record_load', 'message_formats.failed_search_run'].forEach((property) => {
      it(`Settings.${property} returns a string`, function () {
        property = property.split('.');
        expect(property.includes('message_formats') ? Settings.message_formats[property.pop()] : Settings[property.pop()]).to.be.a('string');
      });
    });

    it('Settings.obnoxious returns a boolean', function () {
      expect(Settings.obnoxious).to.be.a('boolean');
    });
  });
});
