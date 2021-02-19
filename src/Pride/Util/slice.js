export default function slice(array, begin, end) {
  return Array.prototype.slice.call(array, begin, end);
};
