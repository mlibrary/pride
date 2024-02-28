import nodeFactory from '../Core/nodeFactory';

const FieldBoolean = nodeFactory(
  'field_boolean',
  ['field_boolean', 'field'],
  function () {
    if (!['AND', 'OR', 'NOT'].includes(this.value)) {
      throw new Error('Not a valid boolean value');
    }

    this.serializedChildren = () => {
      return this.children.map((child) => {
        if (child.type === this.type || (child.type === 'literal' && child.value.match(/\s/))) {
          return `(${child.serialize()})`;
        }
        return child.serialize();
      });
    };

    this.serialize = () => {
      return this.serializedChildren().join(` ${this.value} `);
    };
  }
);

export default FieldBoolean;
