import _ from 'underscore';
import slice from './slice';
import safeApply from './safeApply';

const FuncBuffer = function(extension) {
  let buffer = {};

  this.safeGet = (name) => {
    if (!_.has(buffer, name)) buffer[name] = [];
    return buffer[name];
  };

  this.add = (func, name) => {
    this.safeGet(name).push(func);
    return this;
  };

  this.remove = (func, name) => {
    buffer[name] = _.reject(
      this.safeGet(name),
      (otherFunc) => func === otherFunc
    );
    return this;
  };

  this.clear = (name) => {
    delete buffer[name];
    return this;
  };

  this.clearAll = () => {
    buffer = {};
    return this;
  };

  this.apply = (name, args) => {
    _.each(
      this.safeGet(name),
      (func) => safeApply(func, args)
    );
    return this;
  };

  this.call = (name) => {
    this.apply(name, slice(arguments, 1));
    return this;
  };

  if (_.isFunction(extension)) extension.call(this);
};

export default FuncBuffer;
