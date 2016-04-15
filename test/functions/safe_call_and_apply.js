// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

function test_safe_func_caller(caller) {
  QUnit.test(
    "given something that isn't a function",
    function(assert) {
      object = {};

      assert.equal(
       caller(object), object,
        "returns the given object"
      );
    }
  );

  QUnit.test(
    "given a function, calls the function",
    function(assert) {
      var returned = 8435;
      var example  = function() { return returned; };

      assert.equal(
       caller(example), returned,
        "returns the result fo calling the function"
      );
    }
  );
}

QUnit.module("safeCall()");

test_safe_func_caller(Pride.Util.safeCall);

QUnit.test(
  "given additional arguments",
  function(assert) {
    var given_first  = "first!";
    var given_second = "not first!";

    var returned_first;
    var returned_second;

    var example = function(first, second) {
                    returned_first  = first;
                    returned_second = second;
                  };

    Pride.Util.safeCall(example, given_first, given_second);

    assert.equal(
     returned_first, given_first,
      "passes given argument into the fuction"
    );

    assert.equal(
     returned_second, given_second,
      "can pass multiple arguments"
    );
  }
);

QUnit.module("safeApply()");

test_safe_func_caller(Pride.Util.safeApply);

QUnit.test(
  "given an array of arguments",
  function(assert) {
    var given_first  = "first!";
    var given_second = "not first!";

    var returned_first;
    var returned_second;

    var example = function(first, second) {
                    returned_first  = first;
                    returned_second = second;
                  };

    Pride.Util.safeApply(example, [given_first, given_second]);

    assert.equal(
     returned_first, given_first,
      "passes first argument into the fuction"
    );

    assert.equal(
     returned_second, given_second,
      "can pass multiple arguments"
    );
  }
);
