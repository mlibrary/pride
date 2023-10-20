describe('Pride.Util.safeCall()', function () {
  testSafeFuncCaller(Pride.Util.safeCall);

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

      Pride.Util.safeCall(this.example, this.given_first, this.given_second);
    });

    it('passes given argument into the fuction', function () {
      expect(this.returned_first).to.equal(this.given_first);
    });

    it('can pass multiple arguments', function () {
      expect(this.returned_second).to.equal(this.given_second);
    });
  });
});
