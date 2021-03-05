'use strict';

import Messenger from './Pride/Messenger.js';

import Util from './Pride/Util.js';
import Paginater from './Pride/Util/Paginater';

const Pride = {};

Object.defineProperty(Pride, 'Messenger', { value: Messenger });

Object.defineProperty(Pride, 'Util', { value: Util });
Object.defineProperty(Pride.Util, 'Paginater', { value: Paginater });

export default Pride;
