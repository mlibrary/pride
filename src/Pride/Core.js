import Holdings from './Core/Holdings';
import nodeFactory from './Core/nodeFactory';

const Core = {
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'Holdings', { value: Holdings });

export default Core;
