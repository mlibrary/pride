const { expect } = require('chai');
const sinon = require('sinon');
const log = require('../../../pride').Pride.Core.log;
const Settings = require('../../../pride').Pride.Settings;

describe('Pride.Core.log()', function () {
  let consoleLogSpy;
  const logArguments = ['TestSource', 'TestInfo', 'Additional', 'Info', 'Here'];

  beforeEach(function() {
    consoleLogSpy = sinon.spy(console, 'log');
  });

  afterEach(function() {
    consoleLogSpy.restore();
  });

  it('works', function () {
    expect(log()).to.not.be.null;
  });

  it('does not call console.log when `Settings.obnoxious` is `false`', function() {
    expect(Settings.obnoxious).to.be.false;
    log(...logArguments);
    expect(consoleLogSpy.called).to.be.false;
  });

  it('calls console.log with correct arguments when `Settings.obnoxious` is `true`', function() {
    Settings.obnoxious = true;
    expect(Settings.obnoxious).to.be.true;
    log(...logArguments);
    expect(consoleLogSpy.calledOnce).to.be.true;
    expect(consoleLogSpy.calledWith(`[Pride: ${logArguments[0]}] ${logArguments[1]}`, ...logArguments.slice(2))).to.be.true;
  });
});
