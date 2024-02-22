import nodeFactory from '../Core/nodeFactory';
import insideFieldNodes from './insideFieldNodes';

const Tag = nodeFactory('tag', insideFieldNodes, function () {
  this.serialize = () => {
    return `${this.value}: (${this.serializedChildren().join(' ')})`;
  };
});

export default Tag;
