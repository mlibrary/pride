import _ from 'underscore';
import nodeFactory from './nodeFactory';

const boolNodeFactory = function (type, childTypes) {
  return nodeFactory(
    type,
    childTypes,
    function () {
      // Ensure that only valid boolean values are given.
      if (!(_.contains(['AND', 'OR', 'NOT'], this.value))) {
        throw new Error('Not a valid boolean value');
      }

      this.serialize = function () {
        return this.serializedChildren()
          .join(' ' + this.value + ' ');
      };

      this.serializedChildren = function () {
        const thisNode = this;

        return _.chain(thisNode.children)
          .map(function (child) {
            if (child.type === thisNode.type ||
                            (child.type === 'literal' && child.value.match(/\s/))) {
              return '(' + child.serialize() + ')';
            } else {
              return child.serialize();
            }
          })
          .compact()
          .value();
      };
    }
  );
};

export default boolNodeFactory;
