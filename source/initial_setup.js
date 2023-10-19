// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import AllDatastores from '../src/Pride/AllDatastores';
import Core from '../src/Pride/Core';
import FieldTree from '../src/Pride/FieldTree';
import init from '../src/Pride/init';
import Messenger from '../src/Pride/Messenger';
import Parser from '../src/Pride/Parser';
import PreferenceEngine from '../src/Pride/PreferenceEngine';
import requestRecord from '../src/Pride/requestRecord';
import Settings from '../src/Pride/Settings';
import Util from '../src/Pride/Util';

export const Pride = {
  AllDatastores,
  Core,
  FieldTree,
  Messenger,
  Parser,
  PreferenceEngine,
  requestRecord,
  Settings,
  Util
};

Pride.init = init;
