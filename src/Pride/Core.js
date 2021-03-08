import nodeFactory from './Core/nodeFactory';
import Query from './Core/Query';

const Core = {
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'Query', { value: Query });

export default Core;
