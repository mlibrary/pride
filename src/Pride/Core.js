import nodeFactory from './Core/nodeFactory';

const Core = {
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

export default Core;
