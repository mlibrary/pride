import { expect } from 'chai';
import deepClone from '../../../src/Pride/Util/deepClone';

describe('deepClone()', function() {
  it('passes functions straight through', () => {
    const func = () => {};
    const cloned = deepClone(func);

    expect(cloned === func).to.be.true;
  });

  it('returns a new instance of objects', () => {
    const object = {};
    const cloned = deepClone(object);

    expect(typeof (cloned)).to.equal('object');
    expect(cloned === object).to.be.false;
  });

  it('returns a new instance of arrays', () => {
    const array = [];
    const cloned = deepClone(array);

    expect(array instanceof Array).to.be.true;
    expect(cloned === array).to.be.false;
  });

  it('clones content of arrays', () => {
    const array = [1, 'two', null];
    const cloned = deepClone(array);

    array.forEach((element, index) => {
      expect(cloned[index]).to.equal(element);
    });
  });

  it('clones content of objects', () => {
    const object = { x: 1, y: 'two', z: null };
    const cloned = deepClone(object);

    Object.keys(object).forEach((key) => {
      expect(cloned[key]).to.equal(object[key]);
    });
  });

  it('clones nested content', () => {
    const object = { x: 1, y: ['one', { q: 'two' }, 3], z: null };
    const cloned = deepClone(object);

    expect(object.y[1].q).to.equal(cloned.y[1].q);
  });
});
