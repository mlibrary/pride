import boolNodeFactory from '../Core/boolNodeFactory';

const insideFieldNodes = ['value_boolean', 'literal', 'tag', 'special'];

const ValueBoolean = boolNodeFactory(
  'value_boolean',
  insideFieldNodes
);

export default ValueBoolean;
