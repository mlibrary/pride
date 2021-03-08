'use strict';

import requestRecord from './Pride/requestRecord.js';

import Util from './Pride/Util.js';
import Paginater from './Pride/Util/Paginater';

const Pride = {
  requestRecord: (source, id, func) => requestRecord(source, id, func)
};

Object.defineProperty(Pride, 'Util', { value: Util });
Object.defineProperty(Pride.Util, 'Paginater', { value: Paginater });

export default Pride;
