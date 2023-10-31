import AllDatastores from './AllDatastores';
import Core from './Core/index';
import FieldTree from './FieldTree/index';
import init from './init';
import Messenger from './Messenger';
import Parser from './Parser';
import PreferenceEngine from './PreferenceEngine';
import requestRecord from './requestRecord';
import Settings from './Settings';
import Util from './Util/index';

const Pride = {
  AllDatastores,
  Core,
  FieldTree, // Pride.FieldTree = Pride.FieldTree || {};
  init,
  Messenger,
  Parser,
  PreferenceEngine,
  requestRecord,
  Settings,
  Util
};

export default Pride;
