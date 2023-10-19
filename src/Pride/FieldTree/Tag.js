import nodeFactory from '../Core/nodeFactory';

const inside_field_nodes = ['value_boolean', 'literal', 'tag', 'special'];

const Tag = nodeFactory(
  'tag',
  inside_field_nodes,
  function () {
    this.serialize = function () {
      const serialized_children = this.serializedChildren();
      if (serialized_children.length === 0) {
        return '';
      } else {
        return this.value + '(' + serialized_children.join(' ') + ')';
      }
    };
  }
);

export default Tag;
