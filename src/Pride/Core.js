import nodeFactory from './Core/nodeFactory';
import SearchBase from './SearchBase';

const Core = {
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'SearchBase', { value: SearchBase });

export default Core;
