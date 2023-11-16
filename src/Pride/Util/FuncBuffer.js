import _ from 'underscore';
import sliceCall from './sliceCall';
import safeApply from './safeApply';

const FuncBuffer = function (extension) {
  let buffer = {};
  const self = this;

  const safeGet = (name) => {
    if (!_.has(buffer, name)) buffer[name] = [];

    return buffer[name];
  };

  this.add = (func, name) => {
    safeGet(name).push(func);

    return this;
  };

  this.remove = (func, name) => {
    buffer[name] = _.reject(
      safeGet(name),
      (otherFunc) => {
        return func === otherFunc;
      }
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

  this.call = function (name) {
    self.apply(name, sliceCall(arguments, 1));

    return self;
  };

  this.apply = (name, args) => {
    _.each(safeGet(name), (func) => {
      safeApply(func, args);
    });

    return this;
  };

  if (_.isFunction(extension)) extension.call(this);
};

export default FuncBuffer;
