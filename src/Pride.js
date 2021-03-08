'use strict';

import init from './Pride/init.js';
import Util from './Pride/Util.js';
import Paginater from './Pride/Util/Paginater';

const Pride = {
  init: (requestOptions) => init(requestOptions)
};

Object.defineProperty(Pride, 'Util', { value: Util });
Object.defineProperty(Pride.Util, 'Paginater', { value: Paginater });

export default Pride;
