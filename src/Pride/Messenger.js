import FuncBuffer from './Util/FuncBuffer';
import log from './Core/log';
import _ from 'underscore';
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

  this.sendMessage = function(message) {
    if (message.summary) {
      message.class = message.class || 'info';
      message.details = message.details || '';

      notifyObservers(message.class, message);

      log('Messenger', 'MESSAGE SENT', message);
    }

    return this;
  };

  this.sendMessageArray = function(messageArray) {
    messageArray.forEach((message) => this.sendMessage(message));

    return this;
  };

  /*
   * Given a type of preset message and some optional arguments, generate a
   * message string.
   */
  this.preset = function(type) {
    /*
     * const variables = slice(arguments);
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
