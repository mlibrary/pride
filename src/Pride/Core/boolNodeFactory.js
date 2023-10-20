import _ from 'underscore';
import nodeFactory from './nodeFactory';

const boolNodeFactory = function (type, child_types) {
  return nodeFactory(
    type,
    child_types,
    function () {
      // Ensure that only valid boolean values are given.
      if (!(_.contains(['AND', 'OR', 'NOT'], this.value))) {
        throw 'Not a valid boolean value';
      }

      this.serialize = function () {
        return this.serializedChildren()
          .join(' ' + this.value + ' ');
      };

      this.serializedChildren = function () {
        const this_node = this;

        return _.chain(this_node.children)
          .map(function (child) {
            if (child.type == this_node.type ||
                            (child.type == 'literal' && child.value.match(/\s/))) {
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
