// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

QUnit.module("isDeepMatch()");

QUnit.test(
  "returns false when things are not deeply equal",
  function(assert) {
    assert.notOk(
      Pride.Util.isDeepMatch("7", 7),
      'string are not equal to numbers'
    );

    assert.notOk(
      Pride.Util.isDeepMatch("this is a string", "nope"),
      'strings that have different content are not equal'
    );

    assert.notOk(
      Pride.Util.isDeepMatch(45, 999),
      'numbers that are different are not equal'
    );

    assert.notOk(
      Pride.Util.isDeepMatch(
        {x: 1},
        {x: 1, y: 2}
      ),
      'objects with different lengths are not equal'
    );

    assert.notOk(
      Pride.Util.isDeepMatch(
        [1, 2],
        [1, 2, 3]
      ),
      'arrays with different lengths are not equal'
    );

    assert.notOk(
      Pride.Util.isDeepMatch(
        [1, 'two', 33],
        [1, 'two', 325768432]
      ),
      'arrays different content are not equal'
    );

    assert.notOk(
      Pride.Util.isDeepMatch(
        {x: 12, y: 'hmmmm'},
        {x: 12, y: 'yup'}
      ),
      'objects with different content are not equal'
    );

    assert.notOk(
      Pride.Util.isDeepMatch(
        {x: 12, j:   'yup'},
        {x: 12, kay: 'yup'}
      ),
      'objects with different keys are not equal'
    );

    assert.notOk(
      Pride.Util.isDeepMatch(
        [1, ['two',    33]],
        [1, ['fizzle', 33]]
      ),
      'nested unequal arrays are not equal'
    );

    assert.notOk(
      Pride.Util.isDeepMatch(
        {x: 'q', y: {q: 33}},
        {x: 'q', y: {q: 684465465}}
      ),
      'nested unequal arrays are not equal'
    );

    assert.notOk(
      Pride.Util.isDeepMatch(
        {x: 'q', y: [11, 'yup', {a: 33, b: 9, c: [1,168468,3]}]},
        {x: 'q', y: [11, 'yup', {a: 33, b: 9, c: [1,'nope',3]}]}
      ),
      'not equal arrays and objects can be nested'
    );
  }
);

QUnit.test(
  "returns true when things are deeply equal",
  function(assert) {
    assert.ok(
      Pride.Util.isDeepMatch("this is a string", "this is a string"),
      'strings that have the same content are equal'
    );

    assert.ok(
      Pride.Util.isDeepMatch(45, 45),
      'numbers that are the same are equal'
    );

    assert.ok(
      Pride.Util.isDeepMatch({}, {}),
      'empty objects are equal'
    );

    assert.ok(
      Pride.Util.isDeepMatch([], []),
      'empty arrays are equal'
    );

    assert.ok(
      Pride.Util.isDeepMatch(
        [1, 'two', 33],
        [1, 'two', 33]
      ),
      'arrays with the same content are equal'
    );

    assert.ok(
      Pride.Util.isDeepMatch(
        {x: 12, y: 'why?!'},
        {x: 12, y: 'why?!'}
      ),
      'objects with the same content are equal'
    );

    assert.ok(
      Pride.Util.isDeepMatch(
        {f: function() { return true;  }},
        {f: function() { return false; }}
      ),
      'objects with functions are equal as long as the functions have the same names'
    );

    assert.ok(
      Pride.Util.isDeepMatch(
        [1, ['two', 33]],
        [1, ['two', 33]]
      ),
      'nested arrays are equal if the content is the same'
    );

    assert.ok(
      Pride.Util.isDeepMatch(
        {x: 'q', y: {a: 33, b: 9}},
        {x: 'q', y: {a: 33, b: 9}}
      ),
      'nested objects are equal if the content is the same'
    );

    assert.ok(
      Pride.Util.isDeepMatch(
        {x: 'q', y: [11, 'yup', {a: 33, b: 9, c: [1,2,3]}]},
        {x: 'q', y: [11, 'yup', {a: 33, b: 9, c: [1,2,3]}]}
      ),
      'equal arrays and objects can be nested'
    );
  }
);
