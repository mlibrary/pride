import nodeFactory from '../Core/nodeFactory';
import insideFieldNodes from './insideFieldNodes';

const Tag = nodeFactory(
  'tag',
  insideFieldNodes,
  function () {
    this.serialize = function () {
      const serializedChildren = this.serializedChildren();
      if (serializedChildren.length === 0) {
        return '';
      } else {
        return this.value + '(' + serializedChildren.join(' ') + ')';
      }
    };
  }
);

export default Tag;
