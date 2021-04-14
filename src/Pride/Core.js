import Holdings from './Core/Holdings';
import log from './Core/log';
import nodeFactory from './Core/nodeFactory';

const Core = {
  log: (source, info) => log(source, info),
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'Holdings', { value: Holdings });

export default Core;
