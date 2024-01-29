import FuncBuffer from './Util/FuncBuffer';
import log from './Core/log';

const Messenger = new FuncBuffer(function () {
  this.addObserver = this.add;
  this.removeObserver = this.remove;
  this.clearObservers = this.clear;

  this.add = this.remove = this.clear = undefined;

  this.sendMessage = (message) => {
    if (message.summary) {
      message.class = message.class || 'info';
      message.details = message.details || '';

      this.call(message.class, message);

      log('Messenger', 'MESSAGE SENT', message);
    }

    return this;
  };

  this.sendMessageArray = (messageArray) => {
    if (messageArray && messageArray.length > 0) {
      messageArray.forEach((message) => {
        this.sendMessage(message);
      });
    }

    return this;
  };

  this.preset = function (type) {
    // Given a type of preset message and some optional arguments, generate a message string.
  };
});

export default Messenger;
