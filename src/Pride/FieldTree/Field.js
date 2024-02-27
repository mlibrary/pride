import nodeFactory from '../Core/nodeFactory';

const Field = nodeFactory('field', ['value_boolean', 'literal', 'tag', 'special'], function () {
  this.serialize = () => {
    return `${this.value}: (${this.serializedChildren().join(' ')})`;
  };
});

export default Field;
