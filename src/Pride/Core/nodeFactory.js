import _ from 'underscore';
import sliceCall from '../Util/sliceCall';

const nodeFactory = function (type, childTypes, extention) {
  return function (value) {
    this.children = sliceCall(arguments, 1);
    if (this.children.length === 1 && Array.isArray(this.children[0])) {
      this.children = this.children[0];
    }
    this.type = type;
    this.value = value.trim();
    this.childTypes = childTypes || [];
    this.validIfEmpty = true;

    // Check to make sure a child is valid for this node.
    // If it is, add it to the array of children.
    this.addChild = function (newChild) {
      if (_.find(
        this.childTypes,
        function (aType) {
          return newChild.type === aType;
        }
      )) {
        this.children.push(newChild);
      } else {
        throw new Error('Not a valid child for a ' + this.type);
      }

      return this;
    };

    // Check to see if this object is, or contains, an object which
    // which matches the query object.
    this.contains = function (query) {
      if (this.matches(query)) {
        return this;
      } else if (_.isEmpty(this.children)) {
        return false;
      } else {
        return _.find(this.children, function (possible) {
          return possible.contains(query);
        });
      }
    };

    this.matches = function (query) {
      const thisNode = this;
      const queryChildren = query.children || [];

      return _.every(
        _.omit(query, 'children'),
        function (value, key) {
          return thisNode[key] === value;
        }
      ) &&
        _.every(
          queryChildren,
          function (queryChild) {
            return _.some(
              queryChildren,
              function (realChild) {
                return queryChild.matches(realChild);
              }
            );
          }
        );
    };

    this.serialize = function () {
      return value;
    };

    this.serializedChildren = function () {
      return _.chain(this.children)
        .map(function (child) {
          return child.serialize();
        })
        .compact()
        .value();
    };

    this.toJSON = function () {
      return _.mapObject(
        _.pick(this, 'value', 'children', 'type'),
        function (val, key) {
          if (key === 'children') {
            return _.map(val, function (item) {
              return item.toJSON();
            });
          } else {
            return val;
          }
        }
      );
    };

    // If an extention function was given, call it with this.
    if (_.isFunction(extention)) {
      extention.call(this);
    }
  };
};

export default nodeFactory;
