import getPossibleKeys from './getPossibleKeys.js';
import hasKey from './hasKey.js';

const Paginater = {};

Object.defineProperty(Paginater, 'getPossibleKeys', { value: getPossibleKeys });
Object.defineProperty(Paginater, 'hasKey', { value: hasKey });

export default Paginater;
