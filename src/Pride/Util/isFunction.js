const isFunction = function (value) {
  return !!value && (
    Object.prototype.toString.call(value) === '[object Function]' ||
    typeof value === 'function' ||
    value instanceof Function
  );
};

export default isFunction;
