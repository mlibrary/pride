import { expect } from 'chai';
import deepClone from '../../../src/Pride/Util/deepClone';

describe('deepClone()', () => {
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

    expect(cloned[0]).to.equal(array[0]);
    expect(cloned[1]).to.equal(array[1]);
    expect(cloned[2]).to.equal(array[2]);
  });

  it('clones content of objects', () => {
    const object = { x: 1, y: 'two', z: null };
    const cloned = deepClone(object);

    expect(cloned.x).to.equal(object.x);
    expect(cloned.y).to.equal(object.y);
    expect(cloned.z).to.equal(object.z);
  });

  it('clones nested content', () => {
    const object = { x: 1, y: ['one', { q: 'two' }, 3], z: null };
    const cloned = deepClone(object);

    expect(object.y[1].q).to.equal(cloned.y[1].q);
  });
});
