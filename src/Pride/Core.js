import nodeFactory from './Core/nodeFactory';
import FacetSearch from './Core/FacetSearch';

const Core = {
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'FacetSearch', { value: FacetSearch });

export default Core;
