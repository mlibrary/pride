'use strict';

import AllDatastores from './Pride/AllDatastores.js';
import Util from './Pride/Util.js';
import Paginater from './Pride/Util/Paginater';

const Pride = {};

Object.defineProperty(Pride, 'AllDatastores', { value: AllDatastores });
Object.defineProperty(Pride, 'Util', { value: Util });
Object.defineProperty(Pride.Util, 'Paginater', { value: Paginater });

export default Pride;
