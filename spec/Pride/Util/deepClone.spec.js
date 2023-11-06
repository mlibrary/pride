const { expect } = require('chai');
const deepClone = require('../../../pride').Pride.Util.deepClone;

describe('Pride.Util.deepClone()', function () {
  it('passes undefined straight through', function () {
    const pass = undefined;
    const cloned = deepClone(pass);

    expect(cloned === pass).to.be.true;
    expect(cloned).to.be.undefined;
    expect(pass).to.be.undefined;
  });

  it('passes functions straight through', function () {
    const func = () => { /** */ };
    const cloned = deepClone(func);

    expect(cloned === func).to.be.true;
  });

  it('returns a new instance of objects', function () {
    const object = {};
    const cloned = deepClone(object);

    expect(typeof (cloned)).to.equal('object');
    expect(cloned === object).to.be.false;
  });

  it('clones content of objects', function () {
    const object = { x: 1, y: 'two', z: null };
    const cloned = deepClone(object);

    expect(cloned).to.deep.equal(object);
  });

  it('clones nested objects', function () {
    const object = { x: 1, y: ['one', { q: 'two' }, 3], z: null };
    const cloned = deepClone(object);

    expect(cloned).to.deep.equal(object);
  });

  it('returns a new instance of arrays', function () {
    const array = [];
    const cloned = deepClone(array);

    expect(array instanceof Array).to.be.true;
    expect(cloned === array).to.be.false;
  });

  it('clones content of arrays', function () {
    const array = [1, 'two', null];
    const cloned = deepClone(array);

    expect(cloned).to.deep.equal(array);
  });

  it('clones nested arrays', function () {
    const array = [1, 'two', ['one', { q: 'two' }, 3], null];
    const cloned = deepClone(array);

    expect(cloned).to.deep.equal(array);
  });

  it('clones strings', function () {
    const string = 'string';
    const cloned = deepClone(string);

    expect(cloned).to.deep.equal(string);
  });

  it('clones strings', function () {
    const string = 'string';
    const cloned = deepClone(string);

    expect(cloned).to.equal(string);
  });
});
