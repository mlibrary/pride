import { expect } from 'chai';
import Messenger from '../../src/Pride/Messenger';
import Settings from '../../src/Pride/Settings';
import slice from '../../src/Pride/Util/slice';

describe('Messenger()', function() {
  beforeEach(() => {
    this.messengerExample = Messenger;
    this.message = { summary: 'summary' };
    this.sendMessageExample = (message = this.message) => {
      if (message.summary) {
        message.class = message.class || 'info';
        message.details = message.details || '';
      }
      return message;
    };
  });

  it('works', () => {
    expect(Messenger).to.not.be.null;
  });

  ['call', 'add', 'remove', 'clear'].forEach((method) => {
    describe(`${method}()`, () => {
      it('returns undefined by default', () => {
        expect(this.messengerExample[method]).to.be.undefined;
      });
    });
  });

  describe('sendMessage()', () => {
    it('returns a function', () => {
      expect(this.messengerExample.sendMessage).to.be.a('function');
    });

    it('must have `message.summary` defined', () => {
      expect(() => this.messengerExample.sendMessage()).to.throw('Cannot read property \'summary\' of undefined');
    });

    it('assigns `message.class` as `info` if not defined', () => {
      expect(this.sendMessageExample().class).to.equal('info');
    });

    it('assigns `message.details` as \'\' if not defined', () => {
      expect(this.sendMessageExample().details).to.be.a('string');
      expect(this.sendMessageExample().details).to.be.empty;
    });

    it('returns `message.class` if defined', () => {
      this.message.class = 'class';
      expect(this.sendMessageExample().class).to.equal(this.message.class);
    });

    it('returns `message.details` if defined', () => {
      this.message.details = 'details';
      expect(this.sendMessageExample().details).to.equal(this.message.details);
    });

    it('returns itself', () => {
      expect(this.messengerExample.sendMessage({})).to.equal(this.messengerExample);
    });
  });

  describe('sendMessageArray()', () => {
    it('returns a function', () => {
      expect(this.messengerExample.sendMessageArray).to.be.a('function');
    });

    it('must have `messageArray` defined', () => {
      expect(() => this.messengerExample.sendMessageArray()).to.throw();
    });

    it('returns itself', () => {
      expect(this.messengerExample.sendMessageArray([])).to.equal(this.messengerExample);
    });
  });

  describe('preset()', () => {
    const presetFunction = function(type) {
      const variables = slice(arguments);
      return Settings
        .message_formats[type]
        .replace(
          /(^|[^\\])\$(\d+)/,
          (match, previousChar, number) => previousChar + (variables[Number(number)] || '')
        )
        .replace('\\$', '$');
    };
    const messageFormats = Object.keys(Settings.message_formats);
    const searchKey = 'test';

    it('returns a function', () => {
      expect(this.messengerExample.preset).to.be.a('function');
    });

    it('returns message format', () => {
      messageFormats.forEach((messageFormat) => {
        expect(presetFunction(messageFormat, searchKey)).to.equal(Settings.message_formats[messageFormat].replace('$1', searchKey));
      });
    });

    it('has all messages silenced', () => {
      messageFormats.forEach((messageFormat) => {
        expect(this.messengerExample.preset(messageFormat)).to.be.undefined;
      });
    });
  });
});
