// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

// Given a safeCall like function, check that it has the correct basic behavior
function test_safe_func_caller(caller) {
  describe("given something that isn't a function", function() {
    it("returns the given object", function() {
      var object = {};
      expect(caller(object)).toEqual(object);
    });
  });

  describe("given a function, calls the function", function() {
    it("returns the result of calling the function", function() {
      var returned = 8435;
      var example  = function() { return returned; };
      expect(caller(example)).toEqual(returned);
    });
  });
}

describe("safeCall()", function() {
  test_safe_func_caller(Pride.Util.safeCall);

  describe("given additional arguments", function() {
    beforeEach(function() {
      var self = this;

      this.given_first  = "first!";
      this.given_second = "not first!";

      this.returned_first  = null;
      this.returned_second = null;

      this.example = function(first, second) {
                       self.returned_first  = first;
                       self.returned_second = second;
                     };

      Pride.Util.safeCall(this.example, this.given_first, this.given_second);
    });

    it("passes given argument into the fuction", function() {
      expect(this.returned_first).toEqual(this.given_first);
    });

    it("can pass multiple arguments", function() {
      expect(this.returned_second).toEqual(this.given_second);
    });
  });
});

describe("safeApply()", function() {
  test_safe_func_caller(Pride.Util.safeApply);

  describe("given additional arguments", function() {
    beforeEach(function() {
      var self = this;

      this.given_first  = "first!";
      this.given_second = "not first!";

      this.returned_first  = null;
      this.returned_second = null;

      this.example = function(first, second) {
                       self.returned_first  = first;
                       self.returned_second = second;
                     };

      Pride.Util.safeApply(this.example, [this.given_first, this.given_second]);
    });

    it("passes given argument into the fuction", function() {
      expect(this.returned_first).toEqual(this.given_first);
    });

    it("can pass multiple arguments", function() {
      expect(this.returned_second).toEqual(this.given_second);
    });
  });
});
