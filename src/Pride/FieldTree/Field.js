import nodeFactory from '../Core/nodeFactory';

var inside_field_nodes = ['value_boolean', 'literal', 'tag', 'special'];

const Field = nodeFactory(
  'field',
  inside_field_nodes,
  function() {
    this.serialize = function() {
      return this.value + ': (' +
               this.serializedChildren().join(' ') +
             ')';
    };
  }
);

export default Field;
