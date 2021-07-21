'use strict';

import AllDatastores from './Pride/AllDatastores.js';
import init from './Pride/init.js';
import Messenger from './Pride/Messenger.js';
import PreferenceEngine from './Pride/PreferenceEngine.js';
import requestRecord from './Pride/requestRecord.js';
import Settings from './Pride/Settings.js';

import Core from './Pride/Core';

import Util from './Pride/Util.js';
import Paginater from './Pride/Util/Paginater';

const Pride = {
  init: (requestOptions) => init(requestOptions),
  requestRecord: (source, id, func) => requestRecord(source, id, func)
};

Object.defineProperty(Pride, 'AllDatastores', { value: AllDatastores });
Object.defineProperty(Pride, 'Messenger', { value: Messenger });
Object.defineProperty(Pride, 'PreferenceEngine', { value: PreferenceEngine });
Object.defineProperty(Pride, 'Settings', { value: Settings });

Object.defineProperty(Pride, 'Core', { value: Core });

Object.defineProperty(Pride, 'Util', { value: Util });
Object.defineProperty(Pride.Util, 'Paginater', { value: Paginater });

export default Pride;
