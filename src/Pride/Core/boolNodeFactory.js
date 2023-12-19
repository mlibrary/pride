import nodeFactory from './nodeFactory';

const boolNodeFactory = function (type, childTypes) {
  return nodeFactory(
    type,
    childTypes,
    function () {
      if (!['AND', 'OR', 'NOT'].includes(this.value)) {
        throw new Error('Not a valid boolean value');
      }

      this.serializedChildren = function () {
        return this.children.map((child) => {
          if (child.type === this.type || (child.type === 'literal' && child.value.match(/\s/))) {
            return `(${child.serialize()})`;
          }
          return child.serialize();
        });
      };

      this.serialize = function () {
        return this.serializedChildren().join(` ${this.value} `);
      };
    }
  );
};

export default boolNodeFactory;
