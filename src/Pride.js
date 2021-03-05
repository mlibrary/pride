'use strict';

import PreferenceEngine from './Pride/PreferenceEngine.js';
import Util from './Pride/Util.js';
import Paginater from './Pride/Util/Paginater';

const Pride = {};

Object.defineProperty(Pride, 'PreferenceEngine', { value: PreferenceEngine });

Object.defineProperty(Pride, 'Util', { value: Util });
Object.defineProperty(Pride.Util, 'Paginater', { value: Paginater });

export default Pride;
