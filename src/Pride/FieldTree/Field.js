import nodeFactory from '../Core/nodeFactory';
import insideFieldNodes from './insideFieldNodes';

const Field = nodeFactory(
  'field',
  insideFieldNodes,
  function () {
    this.serialize = function () {
      return `${this.value}: (${this.serializedChildren().join(' ')})`;
    };
  }
);

export default Field;
