import deepClone from './deepClone.js';
import escape from './escape.js';
import FuncBuffer from './FuncBuffer.js';
import isDeepMatch from './isDeepMatch.js';
import MultiSearch from './MultiSearch.js';
import Paginater from './Paginater/index.js';
import request from './request.js';
import RequestBuffer from './RequestBuffer.js';
import safeApply from './safeApply.js';
import safeCall from './safeCall.js';
import SearchSwitcher from './SearchSwitcher.js';
import Section from './Section.js';
import slice from './slice.js';

const Util = {};

Object.defineProperty(Util, 'deepClone', { value: deepClone });
Object.defineProperty(Util, 'escape', { value: escape });
Object.defineProperty(Util, 'FuncBuffer', { value: FuncBuffer });
Object.defineProperty(Util, 'isDeepMatch', { value: isDeepMatch });
Object.defineProperty(Util, 'MultiSearch', { value: MultiSearch });
Object.defineProperty(Util, 'Paginater', { value: Paginater });
Object.defineProperty(Util, 'request', { value: request });
Object.defineProperty(Util, 'RequestBuffer', { value: RequestBuffer });
Object.defineProperty(Util, 'safeApply', { value: safeApply });
Object.defineProperty(Util, 'safeCall', { value: safeCall });
Object.defineProperty(Util, 'SearchSwitcher', { value: SearchSwitcher });
Object.defineProperty(Util, 'Section', { value: Section });
Object.defineProperty(Util, 'slice', { value: slice });

export default Util;
