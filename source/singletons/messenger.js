// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import _ from 'underscore';

Pride.Messenger = new Pride.Util.FuncBuffer(function() {
  var notifyObservers = this.call;

  this.addObserver    = this.add;
  this.removeObserver = this.remove;
  this.clearObservers = this.clear;

  this.call   = undefined;
  this.add    = undefined;
  this.remove = undefined;
  this.clear  = undefined;

  this.sendMessage = function(message) {
    if (message.summary) {
      message.class   = message.class   || 'info';
      message.details = message.details || '';

      notifyObservers(message.class, message);

      Pride.Core.log('Messenger', 'MESSAGE SENT', message);
    }

    return this;
  };

  this.sendMessageArray = function(message_array) {
    var messenger = this;

    _.each(
      message_array,
      function(message) { messenger.sendMessage(message); }
    );

    return this;
  };

  // Given a type of preset message and some optional arguments, generate a
  // message string.
  this.preset = function(type) {
    // var variables = Pride.Util.slice(arguments);

    // return Pride.Settings
    //             .message_formats[type]
    //             .replace(
    //               /(^|[^\\])\$(\d+)/,
    //               function(match, previous_char, number) {
    //                 return previous_char + (variables[Number(number)] || '');
    //               }
    //             )
    //             .replace('\\$', '$');
  };
});
