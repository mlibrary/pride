import _ from 'underscore';
import FuncBuffer from './Util/FuncBuffer';
import log from './Core/log';
/*
 * import Settings from './Settings';
 * import slice from './Util/slice';
 */

const Messenger = new FuncBuffer(function() {
  const notifyObservers = this.call;

  this.call = undefined;
  this.add = undefined;
  this.remove = undefined;
  this.clear = undefined;

  this.sendMessage = (message) => {
    if (message.summary) {
      message.class = message.class || 'info';
      message.details = message.details || '';

      notifyObservers(message.class, message);

      log('Messenger', 'MESSAGE SENT', message);
    }

    return this;
  };

  this.sendMessageArray = (messageArray) => {
    _.each(
      messageArray,
      (message) => this.sendMessage(message)
    );

    return this;
  };

  /*
   * Given a type of preset message and some optional arguments, generate a
   * message string.
   */
  this.preset = (type) => {
    /*
     * const variables = slice(arguments);
     *
     * return Settings
     *   .message_formats[type]
     *   .replace(
     *     /(^|[^\\])\$(\d+)/,
     *     (match, previousChar, number) => previousChar + (variables[Number(number)] || '')
     *   )
     *   .replace('\\$', '$');
     */
  };
});

export default Messenger;
