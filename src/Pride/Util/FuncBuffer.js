import _ from 'underscore';
import sliceCall from './sliceCall';
import safeApply from './safeApply';

const FuncBuffer = function (extension) {
  let buffer = {};
  const self = this;

  const safeGet = function (name) {
    if (!_.has(buffer, name)) buffer[name] = [];

    return buffer[name];
  };

  this.add = function (func, name) {
    safeGet(name).push(func);

    return self;
  };

  this.remove = function (func, name) {
    buffer[name] = _.reject(
      safeGet(name),
      function (otherFunc) {
        return func === otherFunc;
      }
    );

    return self;
  };

  this.clear = function (name) {
    delete buffer[name];

    return self;
  };

  this.clearAll = function () {
    buffer = {};

    return self;
  };

  this.call = function (name) {
    self.apply(name, sliceCall(arguments, 1));

    return self;
  };

  this.apply = function (name, args) {
    _.each(safeGet(name), function (func) {
      safeApply(func, args);
    });

    return self;
  };

  if (_.isFunction(extension)) extension.call(this);
};

export default FuncBuffer;
