const nodeFactory = function (type, childTypes, extension) {
  return function (value, ...children) {
    this.children = children;
    if (this.children.length === 1 && Array.isArray(this.children[0])) {
      this.children = this.children[0];
    }
    this.type = type;
    this.value = value.trim();
    this.childTypes = childTypes || [];

    // Check to make sure a child is valid for this node.
    // If it is, add it to the array of children.
    this.addChild = function (newChild) {
      if (!childTypes.find((aType) => {
        return newChild.type === aType;
      })) {
        throw new Error(`Not a valid child for a ${this.type}`);
      }

      this.children.push(newChild);

      return this;
    };

    // Check to see if this object is, or contains, an object which
    // which matches the query object.
    this.contains = function (query) {
      if (this.matches(query)) {
        return this;
      }

      if (this.children.length === 0) {
        return false;
      }

      return this.children.find((possible) => {
        return possible.contains(query);
      });
    };

    this.matches = function (query) {
      const thisNode = this;
      const queryChildren = query.children || [];

      delete query.children;

      return Object.keys(query).every((key) => {
        return thisNode[key] === query[key];
      }) &&
      queryChildren.every((queryChild) => {
        return queryChildren.some((realChild) => {
          return queryChild.matches(realChild);
        });
      });
    };

    this.serialize = function () {
      return value;
    };

    this.serializedChildren = function () {
      const children = [];

      this.children.forEach((child) => {
        children.push(child.serialize());
      });

      return children;
    };

    this.toJSON = function () {
      const object = { ...this };

      Object.keys(object).forEach((key) => {
        if (!['value', 'children', 'type'].includes(key)) {
          delete object[key];
        }
      });

      object.children.forEach((child) => {
        child.toJSON();
      });

      return object;
    };

    // If an extension function was given, call it with this.
    if (typeof extension === 'function') extension.call(this);
  };
};

export default nodeFactory;
