'use strict';

import Core from './Pride/Core';

import Settings from './Pride/Settings.js';

import Util from './Pride/Util.js';
import Paginater from './Pride/Util/Paginater';

const Pride = {};

Object.defineProperty(Pride, 'Core', { value: Core });

Object.defineProperty(Pride, 'Settings', { value: Settings });

Object.defineProperty(Pride, 'Util', { value: Util });
Object.defineProperty(Pride.Util, 'Paginater', { value: Paginater });

export default Pride;
