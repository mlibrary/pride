// Given a safeApply/safeCall like function, check that it has the correct basic behavior
function testSafeFuncCaller (caller) {
  describe("given something that isn't a function", function () {
    it('returns the given object', function () {
      const object = {};
      expect(caller(object)).to.equal(object);
    });
  });

  describe('given a function, calls the function', function () {
    it('returns the result of calling the function', function () {
      const returned = 8435;
      const example = function () {
        return returned;
      };
      expect(caller(example)).to.equal(returned);
    });
  });
}

describe('Pride.Util.safeApply()', function () {
  testSafeFuncCaller(Pride.Util.safeApply);

  describe('given additional arguments', function () {
    beforeEach(function () {
      const self = this;

      this.givenFirst = 'first!';
      this.givenSecond = 'not first!';

      this.returnedFirst = null;
      this.returnedSecond = null;

      this.example = function (first, second) {
        self.returnedFirst = first;
        self.returnedSecond = second;
      };

      Pride.Util.safeApply(this.example, [this.givenFirst, this.givenSecond]);
    });

    it('passes given argument into the fuction', function () {
      expect(this.returnedFirst).to.equal(this.givenFirst);
    });

    it('can pass multiple arguments', function () {
      expect(this.returnedSecond).to.equal(this.givenSecond);
    });
  });
});
