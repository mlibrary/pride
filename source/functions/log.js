// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

// Perform a deep clone that leaves functions untouched.
Pride.Core.log = function(source, info) {
  if (Pride.Settings.obnoxious) {
    var message = Pride.Util.slice(arguments, 2);
    message.unshift('[Pride: ' + source + '] ' + info);

    console.log.apply(console, message);
  }
};
