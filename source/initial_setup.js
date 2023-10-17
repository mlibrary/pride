// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import AllDatastores from './src/Pride/AllDatastores';
import PreferenceEngine from './src/Pride/PreferenceEngine';
import Settings from './src/Pride/Settings';

import escape from './src/Pride/Util/escape';
import isDeepMatch from './src/Pride/Util/isDeepMatch';
import safeApply from './src/Pride/Util/safeApply';
import slice from './src/Pride/Util/slice';

export var Pride = {
  AllDatastores,
  PreferenceEngine,
  Settings
};

Pride.Util = {
  escape,
  isDeepMatch,
  safeApply,
  slice
};

Pride.Core = {};
