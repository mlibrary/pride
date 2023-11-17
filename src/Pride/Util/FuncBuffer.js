import safeApply from './safeApply';
import isFunction from './isFunction';

const FuncBuffer = function (extension) {
  let buffer = {};

  this.clear = (name) => {
    delete buffer[name];
    return this;
  };

  this.clearAll = () => {
    buffer = {};
    return this;
  };

  const safeGet = (name) => {
    if (!(!!buffer && hasOwnProperty.call(buffer, name))) {
      buffer[name] = [];
    }
    return buffer[name];
  };

  this.add = (func, name) => {
    safeGet(name).push(func);
    return this;
  };

  this.remove = (func, name) => {
    buffer[name] = safeGet(name).filter((otherFunc) => {
      return func !== otherFunc;
    });
    return this;
  };

  this.apply = (name, args) => {
    safeGet(name).forEach((func) => {
      safeApply(func, args);
    });
    return this;
  };

  this.call = (name, ...args) => {
    this.apply(name, args);
    return this;
  };

  if (isFunction(extension)) extension.call(this);
};

export default FuncBuffer;
