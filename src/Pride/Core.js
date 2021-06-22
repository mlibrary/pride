import DatastoreSearch from './Core/DatastoreSearch';
import FacetSearch from './Core/FacetSearch';
import GetThis from './Core/GetThis';
import Holdings from './Core/Holdings';
import log from './Core/log';
import nodeFactory from './Core/nodeFactory';
import Query from './Core/Query';
import Record from './Core/Record';
import SearchBase from './Core/SearchBase';

const Core = {
  log: (source, info) => log(source, info),
  nodeFactory: (type, childTypes, extention) => nodeFactory(type, childTypes, extention)
};

Object.defineProperty(Core, 'DatastoreSearch', { value: DatastoreSearch });
Object.defineProperty(Core, 'FacetSearch', { value: FacetSearch });
Object.defineProperty(Core, 'GetThis', { value: GetThis });
Object.defineProperty(Core, 'Holdings', { value: Holdings });
Object.defineProperty(Core, 'Query', { value: Query });
Object.defineProperty(Core, 'Record', { value: Record });
Object.defineProperty(Core, 'SearchBase', { value: SearchBase });

export default Core;
