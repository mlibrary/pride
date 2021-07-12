import _ from 'underscore';

export default function deepClone(original) {
  if (_.isFunction(original)) {
    return original;
  }
  let collectionFunction = false;
  if (_.isArray(original)) {
    collectionFunction = 'map';
  }
  if (_.isObject(original)) {
    collectionFunction = 'mapObject';
  }
  if (collectionFunction) {
    return _[collectionFunction](
      original,
      (item) => deepClone(item)
    );
  }
  return _.clone(original);
}
