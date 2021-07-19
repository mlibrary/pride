import { expect } from 'chai';
import Settings from '../../../src/Pride/Settings';
import slice from '../../../src/Pride/Util/slice';

describe('log()', function() {
  beforeEach(() => {
    this.logExample = function(source, info) {
      if (Settings.obnoxious) {
        const message = slice(arguments, 2);
        message.unshift(`[Pride: ${source}] ${info}`);

        return message[0];
      }
    };
  });

  for (let i = 0; i < 2; i++) {
    const obnoxious = i === 0;
    describe(`if Settings.obnoxious is ${obnoxious}`, () => {
      beforeEach(() => {
        Settings.obnoxious = obnoxious;
      });

      it(`returns ${obnoxious ? 'a message' : 'undefined'}`, () => {
        expect(this.logExample('Request', 'Trying request again...')).to.equal(obnoxious ? '[Pride: Request] Trying request again...' : undefined);
      });
    });
  }
});
