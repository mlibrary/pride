import nodeFactory from '../Core/nodeFactory';

const insideFieldNodes = ['value_boolean', 'literal', 'tag', 'special'];

const Tag = nodeFactory(
  'tag',
  insideFieldNodes,
  function () {
    this.serialize = function () {
      const serializedChildren = this.serializedChildren();
      if (serializedChildren.length === 0) {
        return '';
      } else {
        return this.value + '(' + serializedChildren.join(' ') + ')';
      }
    };
  }
);

export default Tag;
