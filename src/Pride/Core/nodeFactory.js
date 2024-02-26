const nodeFactory = (type, childTypes = [], extension) => {
  return function (value, ...children) {
    this.type = type;
    this.childTypes = childTypes;
    this.value = value.trim();
    this.children = children.length === 1 && Array.isArray(children[0]) ? children[0] : children;

    this.addChild = (newChild) => {
      if (!this.childTypes.includes(newChild.type)) {
        throw new Error(`Not a valid child for a ${this.type}`);
      }
      this.children.push(newChild);
      return this;
    };

    this.contains = (query) => {
      if (this.matches(query)) {
        return this;
      }
      return this.children.find((child) => {
        return child.contains(query);
      }) ?? false;
    };

    this.matches = (query) => {
      const queryKeys = Object.keys(query).filter((key) => {
        return key !== 'children';
      });
      const { children: queryChildren = [] } = query;

      return queryKeys.every((key) => {
        return this[key] === query[key];
      }) &&
        queryChildren.every((queryChild) => {
          return this.children.some((child) => {
            return child.matches(queryChild);
          });
        });
    };

    this.serialize = () => {
      return value;
    };

    this.serializedChildren = () => {
      return this.children.map((child) => {
        return child.serialize();
      });
    };

    this.toJSON = () => {
      const json = {
        type: this.type,
        value: this.value,
        children: this.children.map((child) => {
          return child.toJSON();
        })
      };
      return json;
    };

    if (typeof extension === 'function') extension.call(this);
  };
};

export default nodeFactory;
