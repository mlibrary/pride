import Datastore from './Core/Datastore';
import nodeFactory from './Core/nodeFactory';

const Core = {
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'Datastore', { value: Datastore });

export default Core;
