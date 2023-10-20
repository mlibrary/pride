import nodeFactory from '../Core/nodeFactory';

const insideFieldNodes = ['value_boolean', 'literal', 'tag', 'special'];

const Field = nodeFactory(
  'field',
  insideFieldNodes,
  function () {
    this.serialize = function () {
      return this.value + ': (' +
               this.serializedChildren().join(' ') +
             ')';
    };
  }
);

export default Field;
