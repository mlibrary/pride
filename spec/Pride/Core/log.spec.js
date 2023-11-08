const { expect } = require('chai');
const log = require('../../../pride').Pride.Core.log;
const Settings = require('../../../pride').Pride.Settings;
const sliceCall = require('../../../pride').Pride.Util.sliceCall;

// Copy code from ./src/Pride/Core/log.js to return `message`
const logMessage = (source = 'Request', info = 'Trying request again...') => {
  if (Settings.obnoxious) {
    const message = sliceCall(arguments, 2);
    message.unshift(`[Pride: ${source}] ${info}`);
    return message[0];
  }
};

describe('Pride.Core.log()', function () {
  it('works', function () {
    expect(log()).to.not.be.null;
  });
  it('returns undefined if Settings.obnoxious is `false`', () => {
    expect(Settings.obnoxious).to.be.false;
    expect(logMessage()).to.be.undefined;
  });
  it('returns a message if Settings.obnoxious is `true`', () => {
    Settings.obnoxious = !Settings.obnoxious;
    expect(Settings.obnoxious).to.be.true;
    expect(logMessage()).to.equal('[Pride: Request] Trying request again...');
  });
});
