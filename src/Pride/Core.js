import nodeFactory from './Core/nodeFactory';
import Record from './Core/Record';

const Core = {
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'Record', { value: Record });

export default Core;
