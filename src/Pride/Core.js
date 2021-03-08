import GetThis from './Core/GetThis';
import nodeFactory from './Core/nodeFactory';

const Core = {
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'GetThis', { value: GetThis });

export default Core;
