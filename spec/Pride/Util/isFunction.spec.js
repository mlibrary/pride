const { expect } = require('chai');
const isFunction = require('../../../pride').Pride.Util.isFunction;

describe('Pride.Util.isFunction()', function () {
  it('works', function () {
    expect(isFunction).to.not.be.null;
  });
  it('returns a boolean', function () {
    expect(isFunction()).to.be.a('boolean');
  });
  it('returns `true` if a function is given', function () {
    const testFunction = () => { /* */ };
    expect(testFunction).to.be.a('function');
    expect(isFunction(testFunction)).to.be.true;
  });
  it('returns `false` if a non-function is given', function () {
    const testArray = ['test', 42, [], {}, null, NaN, undefined];
    testArray.forEach((test) => {
      expect(test).to.be.not.be.a('function');
      expect(isFunction(test)).to.be.false;
    });
  });
});
