describe('Pride.Util.deepClone()', function () {
  it('passes functions straight through', function () {
    const func = () => { /** */ };
    const cloned = Pride.Util.deepClone(func);

    expect(cloned === func).to.be.true;
  });

  it('returns a new instance of objects', function () {
    const object = {};
    const cloned = Pride.Util.deepClone(object);

    expect(typeof (cloned)).to.equal('object');
    expect(cloned === object).to.be.false;
  });

  it('returns a new instance of arrays', function () {
    const array = [];
    const cloned = Pride.Util.deepClone(array);

    expect(array instanceof Array).to.be.true;
    expect(cloned === array).to.be.false;
  });

  it('clones content of arrays', function () {
    const array = [1, 'two', null];
    const cloned = Pride.Util.deepClone(array);

    expect(cloned).to.deep.equal(array);
  });

  it('clones content of objects', function () {
    const object = { x: 1, y: 'two', z: null };
    const cloned = Pride.Util.deepClone(object);

    expect(cloned).to.deep.equal(object);
  });

  it('clones nested content', function () {
    const object = { x: 1, y: ['one', { q: 'two' }, 3], z: null };
    const cloned = Pride.Util.deepClone(object);

    expect(cloned).to.deep.equal(object);
  });
});
