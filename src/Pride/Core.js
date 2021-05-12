import GetThis from './Core/GetThis';
import Holdings from './Core/Holdings';
import log from './Core/log';
import nodeFactory from './Core/nodeFactory';
import Record from './Core/Record';
import SearchBase from './Core/SearchBase';

const Core = {
  log: (source, info) => log(source, info),
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'SearchBase', { value: SearchBase });
Object.defineProperty(Core, 'GetThis', { value: GetThis });
Object.defineProperty(Core, 'Holdings', { value: Holdings });
Object.defineProperty(Core, 'Record', { value: Record });

export default Core;
