const sinon = require('sinon');
const { expect } = require('chai');
const Messenger = require('../../pride').Pride.Messenger;
const FuncBuffer = require('../../pride').Pride.Util.FuncBuffer;

describe('Pride.Messenger', function () {
  const methods = {
    addObserver: 'add',
    removeObserver: 'remove',
    clearObservers: 'clear'
  };
  const funcBuffer = new FuncBuffer();
  const message = {
    summary: 'Test message',
    class: 'success',
    details: 'This is a test message.'
  };

  it('works', function () {
    expect(Messenger).to.not.be.null;
  });

  Object.keys(methods).forEach((method) => {
    describe(method, function () {
      it(`is a copy of ${'`' + methods[method] + '`'}`, function () {
        expect(Messenger[method].toString()).to.deep.equal(funcBuffer[methods[method]].toString());
      });
    });
  });

  ['add', 'remove', 'clear'].forEach((property) => {
    describe(property, function () {
      it('is `undefined` by default', function () {
        expect(Messenger[property]).to.be.undefined;
      });
    });
  });

  describe('sendMessage', function () {
    it('returns self', function () {
      expect(Messenger.sendMessage(message)).to.deep.equal(Messenger);
    });
    it('calls `message`', function () {
      const spy = sinon.spy(Messenger, 'sendMessage');
      Messenger.sendMessage(message);
      expect(spy.calledWith(message)).to.be.true;
      spy.restore();
    });
  });

  describe('sendMessageArray', function () {
    const messageArray = [message, message];
    it('returns self', function () {
      expect(Messenger.sendMessageArray(messageArray)).to.deep.equal(Messenger);
    });
    it('calls `messageArray`', function () {
      const spy = sinon.spy(Messenger, 'sendMessageArray');
      Messenger.sendMessageArray(messageArray);
      expect(spy.calledWith(messageArray)).to.be.true;
      spy.restore();
    });
    it('runs `sendMessage` for every message', function () {
      const spy = sinon.spy(Messenger, 'sendMessage');
      Messenger.sendMessageArray(messageArray);
      expect(spy.callCount).to.equal(messageArray.length);
      spy.restore();
    });
  });

  describe('preset', function () {
    it('calls `type`', function () {
      const spy = sinon.spy(Messenger, 'preset');
      const type = 'type';
      Messenger.preset(type);
      expect(spy.calledWith(type)).to.be.true;
      spy.restore();
    });
    it('returns undefined', function () {
      expect(Messenger.preset('type')).to.be.undefined;
    });
  });
});
