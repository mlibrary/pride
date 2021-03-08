import nodeFactory from './Core/nodeFactory';
import DatastoreSearch from './Core/DatastoreSearch';

const Core = {
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'DatastoreSearch', { value: DatastoreSearch });

export default Core;
