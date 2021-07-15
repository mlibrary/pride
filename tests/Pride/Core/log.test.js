import { expect } from 'chai';
import Settings from '../../../src/Pride/Settings';
import slice from '../../../src/Pride/Util/slice';

describe('log()', () => {
  beforeEach(() => {
    this.logExample = function(source, info) {
      if (Settings.obnoxious) {
        const message = slice(arguments, 2);
        message.unshift(`[Pride: ${source}] ${info}`);

        return message[0];
      }
    };
  });

  describe('if Settings.obnoxious is false', () => {
    beforeEach(() => {
      Settings.obnoxious = false;
    });

    it('returns undefined', () => {
      expect(this.logExample('Request', 'Trying request again...')).to.be.undefined;
    });
  });

  describe('if Settings.obnoxious is true', () => {
    beforeEach(() => {
      Settings.obnoxious = true;
    });

    it('returns a message', () => {
      expect(this.logExample('Request', 'Trying request again...')).to.equal('[Pride: Request] Trying request again...');
    });
  });
});
