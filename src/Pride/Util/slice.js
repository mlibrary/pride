const slice = function(array, begin, end) {
  return Array.prototype.slice.call(array, begin, end);
};

export default slice;
