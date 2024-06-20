import FuncBuffer from './Util/FuncBuffer';
import log from './Core/log';

const createMessenger = () => {
  const funcBuffer = new FuncBuffer();

  const messenger = {
    addObserver: funcBuffer.add,
    clearObservers: funcBuffer.clear,

    preset: () => {
      // Given a type of preset message and some optional arguments, generate a message string.
    },

    removeObserver: funcBuffer.remove,

    sendMessage: (message) => {
      if (message.summary) {
        message.class ||= 'info';
        message.details ||= '';

        funcBuffer.call(message.class, message);

        log('Messenger', 'MESSAGE SENT', message);
      }

      return messenger;
    },

    sendMessageArray: (messageArray) => {
      if (messageArray?.length > 0) {
        messageArray.forEach((message) => {
          messenger.sendMessage(message);
        });
      }

      return messenger;
    }
  };

  return messenger;
};

const Messenger = createMessenger();

export default Messenger;
