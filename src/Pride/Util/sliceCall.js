const sliceCall = function (array, begin, end) {
  return Array.prototype.slice.call(array, begin, end);
};

export default sliceCall;
