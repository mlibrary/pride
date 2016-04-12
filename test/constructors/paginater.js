// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

QUnit.module("Paginater");

function assertPaginatorBasics(assert, key_1, key_2, valid) {
  var settings    = {};
  settings[key_1] = valid[key_1];
  settings[key_2] = valid[key_2];
  var example     = new Pride.Util.Paginater(settings);

  _.each(valid, function(value, key) {
    assert.equal(
      example.get(key), value,
      key + ' is set correctly'
    );
  });

  assert.equal(
    example.get('page_limit'), Infinity,
    'page_limit is infinite'
  );

  assert.equal(
    example.get('index_limit'), Infinity,
    'index_limit is infinite'
  );

  assert.equal(
    example.get('total_pages'), undefined,
    'total_pages limit is undefined'
  );

  assert.equal(
    example.get('total_available'), undefined,
    'total_available limit is undefined'
  );
}

var valid_1 = { start: 10,  count: 5,   end: 14,  page: 3 };
var valid_2 = { start: 500, count: 100, end: 599, page: 6 };

// Test setting basic values
function testPaginatorBasics(key_1, key_2) {
  QUnit.test(
    'Given a valid ' + key_1 + ' and ' + key_2,
    function(assert) {
      assertPaginatorBasics(assert, key_1, key_2, valid_1);
      assertPaginatorBasics(assert, key_1, key_2, valid_2);
    }
  );
}

testPaginatorBasics('start', 'count');
testPaginatorBasics('start', 'end');
testPaginatorBasics('count', 'end');

function testPaginatorUnsettable(assert, invalid_settings, basic_settings) {
  basic_settings = basic_settings || { start: 10, count: 5 };

  assert.throws(
    function() {
      (new Pride.Util.Paginater(basic_settings))
        .set(invalid_settings);
    },
    _.keys(invalid_settings).join(' and ') + " can't be set together after initializaion"
  );

  assert.throws(
    function() {
      new Pride.Util.Paginater(_.extend(basic_settings, invalid_settings));
    },
    _.keys(invalid_settings).join(' and ') + " can't be set together on initializaion"
  );
}

QUnit.test(
  "Certain combinations can't be set",
  function(assert) {
    testPaginatorUnsettable(assert, { total_pages: 100 });
    testPaginatorUnsettable(assert, { index_limit: 100 });
    testPaginatorUnsettable(assert, { start: 10, count: 5, end: 14 });
    testPaginatorUnsettable(assert, { page: 3, start: 10 }, {});
    testPaginatorUnsettable(assert, { page: 3, end: 14 }, {});
    testPaginatorUnsettable(assert, { page: 3, end: 14 }, {});

    assert.throws(
      function() {
        new Pride.Util.Paginater({ start: 10, end: 5});
      },
      "start can't be greater than the end"
    );
  }
);

QUnit.test(
  "Going through available keys",
  function(assert) {
    var all_keys  = [
                      'start',
                      'count',
                      'end',
                      'page',
                      'index_limit',
                      'total_pages',
                      'total_available',
                      'page_limit'
                    ];

    assert.deepEqual(
      Pride.Util.Paginater.getPossibleKeys(), all_keys,
      "getPossibleKeys() returns all possible keys"
    );

    assert.ok(
      _.every(all_keys, function(key) {
        return Pride.Util.Paginater.hasKey(key);
      }),
      "hasKey() returns true when asked for any key that exists"
    );

    assert.notOk(
      Pride.Util.Paginater.hasKey("bloop"),
      "hasKey() returns false when asked for a key that does not exist"
    );
  }
);
