// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

QUnit.module("Section");

QUnit.test(
  'initialized values are validated and corrected',
  function(assert) {
    var start   = 7;
    var end     = 10;
    var example = new Pride.Util.Section(start, end);

    assert.equal(
      example.start, start,
      "start is set at init"
    );

    assert.equal(
      example.end, end,
      "end is set at init"
    );

    example = new Pride.Util.Section(end, start);

    assert.equal(
      example.start, start,
      "start will always be the smaller number, regardless of init order"
    );

    assert.equal(
      example.end, end,
      "end will always be the larger number, regardless of init order"
    );

    example = new Pride.Util.Section(-9, 3);

    assert.equal(
      example.start, 0,
      "if one value is less than zero at init the start will be set to zero"
    );

    example = new Pride.Util.Section(-9, -23);

    assert.equal(
      example.end, 0,
      "if both values are less than zero at init the end will be set to zero"
    );
  }
);

QUnit.test(
  'inSection()',
  function(assert) {
    var start   = 105;
    var end     = 200;
    var inside  = 157;
    var example = new Pride.Util.Section(start, end);

    assert.ok(
      example.inSection(inside),
      'returns true if the value is inside the section'
    );

    assert.ok(
      example.inSection(start),
      'returns true if the value is the start the section'
    );

    assert.ok(
      example.inSection(end),
      'returns true if the value is the end the section'
    );

    assert.notOk(
      example.inSection(end + 1),
      'returns false if the value is the past the end'
    );

    assert.notOk(
      example.inSection(start - 1),
      'returns false if the value is the before the start'
    );
  }
);

QUnit.test(
  'overlaps()',
  function(assert) {
    var start   = 500;
    var end     = 600;
    var example = new Pride.Util.Section(start, end);

    assert.ok(
      example.overlaps(new Pride.Util.Section(end - 1, end + 4)),
      'returns true if the two sections overlap by one at the end'
    );

    assert.ok(
      example.overlaps(new Pride.Util.Section(end - 4, end + 4)),
      'returns true if the two sections overlap by more than one at the end'
    );

    assert.ok(
      example.overlaps(new Pride.Util.Section(start - 4, start + 1)),
      'returns true if the two sections overlap by one at the start'
    );

    assert.ok(
      example.overlaps(new Pride.Util.Section(start - 4, start + 4)),
      'returns true if the two sections overlap by more than one at the start'
    );

    inner_section = new Pride.Util.Section(start + 3, end - 3);

    assert.ok(
      example.overlaps(inner_section),
      'returns true if one section is inside of the other section'
    );

    assert.ok(
      example.overlaps(inner_section),
      'returns true if one section contains the other section'
    );

    assert.notOk(
      example.overlaps(new Pride.Util.Section(start - 10, start - 15)),
      'returns false if one section comes before the other section'
    );

    assert.notOk(
      example.overlaps(new Pride.Util.Section(end + 20, end + 25)),
      'returns false if one section comes after the other section'
    );
  }
);

QUnit.test(
  'calcLength()',
  function(assert) {
    assert.equal(
      (new Pride.Util.Section(35, 40)).calcLength(), 6,
      'gives the length of the section'
    );

    assert.equal(
      (new Pride.Util.Section(100, 27)).calcLength(), 74,
      'gives the length of the section, even when given the start and end out of order'
    );
  }
);

QUnit.test(
  'expanded()',
  function(assert) {
    var start   = 6;
    var end     = 14;
    var amount  = 3;
    var example = new Pride.Util.Section(start, end);

    assert.notEqual(
      example.expanded(amount), example,
      'returns a new object'
    );

    var expanded = example.expanded(amount);

    assert.equal(
      expanded.start, start - amount,
      'moves the start backwards'
    );

    assert.equal(
      expanded.end, end + amount,
      'moves the end forwards'
    );
  }
);

QUnit.test(
  'shifted()',
  function(assert) {
    var start   = 55;
    var end     = 978;
    var amount  = 11;
    var example = new Pride.Util.Section(start, end);

    assert.notEqual(
      example.shifted(amount), example,
      'returns a new object'
    );

    var shifted_together = example.shifted(amount);

    assert.equal(
      shifted_together.start, start + amount,
      'given one number, moves the start forward by that amount'
    );

    assert.equal(
      shifted_together.end, end + amount,
      'given one number, moves the end forward by that amount'
    );

    var another_amount = amount + 4;
    var shifted = example.shifted(amount, another_amount);

    assert.equal(
      shifted.start, start + amount,
      'can move the start seperatly from the end'
    );

    assert.equal(
      shifted.end, end + another_amount,
      'can move the end seperatly from the start'
    );
  }
);
