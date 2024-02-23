const { expect } = require('chai');
const safeApply = require('../../../pride').Pride.Util.safeApply;

describe('Pride.Util.safeApply()', function () {
  let returnedFirst, returnedSecond;

  it('works', function () {
    expect(safeApply()).to.not.be.null;
  });

  it('does not apply given arguments, if function is not provided', function () {
    const object = { returnedFirst, returnedSecond };
    safeApply(object, ['value for object.returnedFirst', 'value for object.returnedSecond']);
    expect(object.returnedFirst).to.be.undefined;
    expect(object.returnedSecond).to.be.undefined;
  });

  it('applies given arguments, if an array', function () {
    const args = ['one', 'two'];
    safeApply((first, second) => {
      returnedFirst = first;
      returnedSecond = second;
    }, args);
    expect(returnedFirst).to.equal(args[0]);
    expect(returnedSecond).to.equal(args[1]);
  });

  it('applies given arguments, if supplying individual arguments', function () {
    const args = ['first', 'second'];
    safeApply((first, second) => {
      returnedFirst = first;
      returnedSecond = second;
    }, ...args);
    expect(returnedFirst).to.equal(args[0]);
    expect(returnedSecond).to.equal(args[1]);
  });

  it('applies given argument, if supplying an individual argument', function () {
    const arg = 'single argument';
    safeApply((first) => {
      returnedFirst = first;
    }, arg);
    expect(returnedFirst).to.equal(arg);
  });
});
