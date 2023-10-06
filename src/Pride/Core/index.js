import boolNodeFactory from './boolNodeFactory.js';
import Datastore from './Datastore.js';
import DatastoreSearch from './DatastoreSearch.js';
import FacetSearch from './FacetSearch.js';
import GetThis from './GetThis.js';
import Holdings from './Holdings.js';
import log from './log.js';
import nodeFactory from './nodeFactory.js';
import Query from './Query.js';
import Record from './Record.js';
import SearchBase from './SearchBase.js';

const Core = {};

Object.defineProperty(Core, 'boolNodeFactory', { value: boolNodeFactory });
Object.defineProperty(Core, 'Datastore', { value: Datastore });
Object.defineProperty(Core, 'DatastoreSearch', { value: DatastoreSearch });
Object.defineProperty(Core, 'FacetSearch', { value: FacetSearch });
Object.defineProperty(Core, 'GetThis', { value: GetThis });
Object.defineProperty(Core, 'Holdings', { value: Holdings });
Object.defineProperty(Core, 'log', { value: log });
Object.defineProperty(Core, 'nodeFactory', { value: nodeFactory });
Object.defineProperty(Core, 'Query', { value: Query });
Object.defineProperty(Core, 'Record', { value: Record });
Object.defineProperty(Core, 'SearchBase', { value: SearchBase });

export default Core;
