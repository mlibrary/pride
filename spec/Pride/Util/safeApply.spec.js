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

      this.given_first = 'first!';
      this.given_second = 'not first!';

      this.returned_first = null;
      this.returned_second = null;

      this.example = function (first, second) {
        self.returned_first = first;
        self.returned_second = second;
      };

      Pride.Util.safeApply(this.example, [this.given_first, this.given_second]);
    });

    it('passes given argument into the fuction', function () {
      expect(this.returned_first).to.equal(this.given_first);
    });

    it('can pass multiple arguments', function () {
      expect(this.returned_second).to.equal(this.given_second);
    });
  });
});
