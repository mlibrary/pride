// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import AllDatastores from './src/Pride/AllDatastores';
import PreferenceEngine from './src/Pride/PreferenceEngine';
import Settings from './src/Pride/Settings';

import deepClone from './src/Pride/Util/deepClone';
import escape from './src/Pride/Util/escape';
import FuncBuffer from './src/Pride/Util/FuncBuffer';
import isDeepMatch from './src/Pride/Util/isDeepMatch';
import Paginater from './src/Pride/Util/Paginater';
import safeApply from './src/Pride/Util/safeApply';
import safeCall from './src/Pride/Util/safeCall';
import Section from './src/Pride/Util/Section';
import slice from './src/Pride/Util/slice';

export const Pride = {
  AllDatastores,
  PreferenceEngine,
  Settings
};

Pride.Util = {
  deepClone,
  escape,
  FuncBuffer,
  isDeepMatch,
  Paginater,
  safeApply,
  safeCall,
  Section,
  slice
};

Pride.Core = {};
