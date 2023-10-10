import AllDatastores from './AllDatastores.js';
import Core from './Core/index.js';
import FieldTree from './FieldTree/index.js';
import init from './init.js';
import Messenger from './Messenger.js';
import Parser from './Parser.js';
import PreferenceEngine from './PreferenceEngine.js';
import requestRecord from './requestRecord.js';
import Settings from './Settings.js';
import Util from './Util/index.js';

const Pride = {};

Object.defineProperty(Pride, 'AllDatastores', { value: AllDatastores });
Object.defineProperty(Pride, 'Core', { value: Core });
Object.defineProperty(Pride, 'FieldTree', { value: FieldTree });
Object.defineProperty(Pride, 'init', { value: init });
Object.defineProperty(Pride, 'Messenger', { value: Messenger });
Object.defineProperty(Pride, 'Parser', { value: Parser });
Object.defineProperty(Pride, 'PreferenceEngine', { value: PreferenceEngine });
Object.defineProperty(Pride, 'requestRecord', { value: requestRecord });
Object.defineProperty(Pride, 'Settings', { value: Settings });
Object.defineProperty(Pride, 'Util', { value: Util });

export default Pride;
