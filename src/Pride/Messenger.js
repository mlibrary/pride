/*
 * import FuncBuffer from './Util/FuncBuffer';
 * import log from './Core/log';
 * import Settings from './Settings';
 * import slice from './Util/slice';
 */

const Messenger = function() { // const Messenger = new FuncBuffer(function() {
  const notifyObservers = this.call;

  this.addObserver = this.add;
  this.removeObserver = this.remove;
  this.clearObservers = this.clear;

  this.call = undefined;
  this.add = undefined;
  this.remove = undefined;
  this.clear = undefined;

  this.sendMessage = function(message) {
    /*
     * if (message['summary']) {
     *   message['class']   = message['class']   || 'info';
     *   message['details'] = message['details'] || '';
     */

    //   notifyObservers(message);

    /*
     *   Pride.Core.log('Messenger', 'MESSAGE SENT', message);
     * }
     */

    // return this;
  };

  this.sendMessageArray = function(messageArray) {
    // var messenger = this;

    /*
     * _.each(
     *   messageArray,
     *   function(message) { messenger.sendMessage(message); }
     * );
     */

    // return this;
  };

  /*
   * Given a type of preset message and some optional arguments, generate a
   * message string.
   */
  this.preset = function(type) {
    // var variables = Pride.Util.slice(arguments);

    /*
     * return Pride.Settings
     *             .message_formats[type]
     *             .replace(
     *               /(^|[^\\])\$(\d+)/,
     *               function(match, previousChar, number) {
     *                 return previousChar + (variables[Number(number)] || '');
     *               }
     *             )
     *             .replace('\\$', '$');
     */
  };
}; // });

export default Messenger;
