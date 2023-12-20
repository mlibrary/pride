import boolNodeFactory from '../Core/boolNodeFactory';
import insideFieldNodes from './insideFieldNodes';

const ValueBoolean = boolNodeFactory(
  'value_boolean',
  insideFieldNodes
);

export default ValueBoolean;
