import { expect } from 'chai';
import Messenger from './Messenger';

describe.only('Messenger()', () => {
  describe('sendMessage()', () => {
    beforeEach(function() {
      this.sendMessage = Messenger.sendMessage({
        summary: 'There was an error.',
        class: 'error'
      });
    });
    it('sendMessage', () => {
      console.log(this.sendMessage);
      expect(this.sendMessage).to.not.be.null;
    });
  });
  describe('sendMessageArray()', () => {
    beforeEach(function() {
      this.sendMessageArray = Messenger.sendMessageArray([
        {
          summary: 'There was an error.',
          class: 'error'
        },
        {
          summary: 'This has been a success!',
          class: 'success'
        }
      ]);
    });
    it('sendMessageArray', () => {
      console.log(this.sendMessageArray);
      expect(this.sendMessageArray).to.not.be.null;
    });
  });
  describe('preset()', () => {
    beforeEach(function() {
      this.preset = Messenger.preset('failed_init');
    });
    it('preset', () => {
      console.log(this.preset);
      expect(this.preset).to.not.be.null;
    });
  });
});
