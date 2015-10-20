var Pride = Pride || {};

Pride.Observable = function(extention) {
  var observer_array = [];

  this.addObserver = function (func) {
    observer_array.push(func);

    return this;
  };

  this.removeObserver = function (removed_func) {
    observer_array = _.reject(observer_array, function(func) {
      return func == removed_func;
    });

    return this;
  };

  this.notifyObservers = function(message) {
    _.each(observer_array, function (func) {
      func(message);
    });

    return this;
  };

  if (_.isFunction(extention)) extention.call(this);
};
