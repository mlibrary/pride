import boolNodeFactory from '../Core/boolNodeFactory';

var inside_field_nodes = ['value_boolean', 'literal', 'tag', 'special'];

const ValueBoolean = boolNodeFactory(
  'value_boolean',
  inside_field_nodes
);

export default ValueBoolean;
