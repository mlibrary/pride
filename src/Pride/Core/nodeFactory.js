import _ from 'underscore';
import slice from '../Util/slice';

const nodeFactory = function (type, child_types, extention) {
  return function (value) {
    this.children = slice(arguments, 1);
    if (this.children.length === 1 && Array.isArray(this.children[0])) {
      this.children = this.children[0];
    }
    this.type = type;
    this.value = value.trim();
    this.child_types = child_types || [];
    this.validIfEmpty = true;

    // Check to make sure a child is valid for this node.
    // If it is, add it to the array of children.
    this.addChild = function (new_child) {
      if (_.find(
        this.child_types,
        function (a_type) {
          return new_child.type === a_type;
        }
      )) {
        this.children.push(new_child);
      } else {
        throw 'Not a valid child for a ' + this.type;
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
      const this_node = this;
      const query_children = query.children || [];

      return _.every(
        _.omit(query, 'children'),
        function (value, key) {
          return this_node[key] == value;
        }
      ) &&
                    _.every(
                      query_children,
                      function (query_child) {
                        return _.any(
                          children,
                          function (real_child) {
                            return query_child.matches(real_child);
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
          if (key == 'children') {
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
