// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

QUnit.module('FuncBuffer');

function testFuncBufferMethods(assert, name) {
  var another_name = "another_buffer";
  var buffer;
  var number;
  var another_number;
  var from_another_name;
  var example_function;

  var init_examples = function() {
    buffer            = new Pride.Util.FuncBuffer();
    number            = 0;
    another_number    = 0;
    from_another_name = 0;
    example_function  = function() { number++; };

    buffer.add(example_function, name);
    buffer.add(function() { another_number++; }, name);
    buffer.add(function() { from_another_name++; }, another_name);
  };

  ////////////////////////////
  // Test the call() method //
  ////////////////////////////

  init_examples();

  buffer.call(name);

  assert.ok(
    (number === 1 && another_number === 1),
    "call() calls functions registered under the given name"
  );

  assert.equal(
    from_another_name, 0,
    "call() doesn't call functions registered under any other name"
  );

  buffer.call(name);

  assert.ok(
    (number === 2 && another_number === 2),
    "repeatedly calling call() works"
  );

  assert.equal(
    buffer.call(name), buffer,
    "call() returns the FuncBuffer"
  );

  assert.equal(
    buffer.call("not_a_defined_name"), buffer,
    "call() with an undefined name doesn't explode"
  );

  /////////////////////////////
  // Test the apply() method //
  /////////////////////////////

  var touched_1 = false;
  var touched_2 = false;
  buffer.add(function(x, y) { if (x && !y) touched_1 = true; }, name);
  buffer.add(function(x, y) { if (x && !y) touched_2 = true; }, name);

  buffer.apply(name, [true, false]);

  assert.ok(
    (touched_1 === true && touched_2  === true),
    "apply() lets you pass in an argument array"
  );

  assert.equal(
    buffer.apply(name), buffer,
    "apply() returns the FuncBuffer"
  );

  /////////////////////////////
  // Test the clear() method //
  /////////////////////////////

  init_examples();

  buffer.clear(name);
  buffer.call(name);

  assert.ok(
    (number === 0 && another_number === 0),
    "clear() removes functions from the named buffer"
  );

  buffer.call(another_name);

  assert.equal(
    from_another_name, 1,
    "clear() doesn't clear other buffers"
  );

  assert.equal(
     buffer.clear(name), buffer,
    "clear() returns the FuncBuffer"
  );

  ////////////////////////////////
  // Test the clearAll() method //
  ////////////////////////////////

  init_examples();

  buffer.clearAll(name);
  buffer.call(name);
  buffer.call(another_name);

  assert.ok(
    (number === 0 && another_number === 0 && from_another_name === 0),
    "clearAll() removes functions from all buffers"
  );

  assert.equal(
     buffer.clear(name), buffer,
    "clearAll() returns the FuncBuffer"
  );

  //////////////////////////////
  // Test the remove() method //
  //////////////////////////////

  init_examples();

  buffer.remove(example_function, name);
  buffer.call(name);

  assert.ok(
    (number === 0 && another_number === 1),
    "remove() only removes the given function"
  );

  assert.equal(
    buffer.remove(name), buffer,
    "remove() returns the FuncBuffer"
  );
}

QUnit.test(
  "Without giving a name",
  function(assert) { testFuncBufferMethods(assert); }
);

QUnit.test(
  "Giving a name",
  function(assert) { testFuncBufferMethods(assert, "example_name"); }
);

QUnit.test(
  "Can be extended",
  function(assert) {
    var this_value = null;
    var example    = new Pride.Util.FuncBuffer(function() {
                       this_value = this;
                     });

    assert.strictEqual(
      example, this_value,
      "function passed in on init is called with 'this' set to the func_buffer"
    );
  }
);
