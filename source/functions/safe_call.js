// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import _ from 'underscore';
import safeApply from '../../src/Pride/Util/safeApply';

Pride.Util.safeCall = function(maybe_func) {
  if (_.isFunction(maybe_func)) {
    return maybe_func.apply(this, Pride.Util.slice(arguments, 1));
  } else {
    return maybe_func;
  }
};

Pride.Util.safeApply = safeApply;
