// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

function paginatorBasicExpectations(key_1, key_2, valid) {
  beforeEach(function() {
    var settings    = {};
    settings[key_1] = valid[key_1];
    settings[key_2] = valid[key_2];
    this.example    = new Pride.Util.Paginater(settings);
  });

  _.each(valid, function(value, key) {
    it('sets ' + key + ' correctly', function() {
      expect(valid[key]).toEqual(value);
    });
  });

  it('sets page_limit to Infinity', function() {
    expect(this.example.get('page_limit')).toEqual(Infinity);
  });

  it('sets index_limit to Infinity', function() {
    expect(this.example.get('index_limit')).toEqual(Infinity);
  });

  it('sets total_pages to undefined', function() {
    expect(this.example.get('total_pages')).toEqual(undefined);
  });

  it('sets total_available to undefined', function() {
    expect(this.example.get('total_available')).toEqual(undefined);
  });
}

// Test setting basic values
function testPaginatorBasics(key_1, key_2) {
  describe('given a valid ' + key_1 + ' and ' + key_2, function() {
      beforeEach(function() {
        this.valid = { start: 10, count: 5, end: 14, page: 3 };
      });

      paginatorBasicExpectations(key_1, key_2, { start: 10, count: 5, end: 14, page: 3 });

      beforeEach(function() {
        this.valid = { start: 500, count: 100, end: 599, page: 6 };
      });

      paginatorBasicExpectations(key_1, key_2, { start: 500, count: 100, end: 599, page: 6 });
    }
  );
}

function testPaginatorUnsettable(invalid_settings, basic_settings) {
  basic_settings = basic_settings || { start: 10, count: 5 };

  it(
    "can't set " + _.keys(invalid_settings).join(' and ') + " together after initializaion",
    function() {
      expect(function() {
        (new Pride.Util.Paginater(basic_settings)).set(invalid_settings);
      }).toThrow();
    }
  );

  it(
    "can't set " + _.keys(invalid_settings).join(' and ') + " together on initializaion",
    function() {
      expect(function() {
        new Pride.Util.Paginater(_.extend(basic_settings, invalid_settings));
      }).toThrow();
    }
  );
}

describe("Paginater", function() {
  testPaginatorBasics('start', 'count');
  testPaginatorBasics('start', 'end');
  testPaginatorBasics('count', 'end');

  describe("certain combinations can't be set", function() {
    testPaginatorUnsettable({ total_pages: 100 });
    testPaginatorUnsettable({ index_limit: 100 });
    testPaginatorUnsettable({ start: 10, count: 5, end: 14 });
    testPaginatorUnsettable({ page: 3,   start: 10 }, {});
    testPaginatorUnsettable({ page: 3,   end:   14 }, {});
    testPaginatorUnsettable({ page: 3,   end:   14 }, {});

    it("can't set the start greater than the end", function() {
      expect(
        function() { new Pride.Util.Paginater({ start: 10, end: 5}); }
      ).toThrow();
    });
  });

  describe('going through available keys', function() {
    beforeAll(function() {
      this.all_keys = [
                        'start',
                        'count',
                        'end',
                        'page',
                        'index_limit',
                        'total_pages',
                        'total_available',
                        'page_limit',
                      ];
    });

    describe('getPossibleKeys()', function() {
      it('returns all possible keys', function() {
        expect(Pride.Util.Paginater.getPossibleKeys()).toEqual(this.all_keys);
      });
    });

    describe('hasKey()', function() {
      it('returns true when asked for any key that exists', function() {
        _.every(this.all_keys, function(key) {
          expect(Pride.Util.Paginater.hasKey(key)).toBe(true);
        });
      });

      it('returns false when asked for a key that does not exist', function() {
        expect(Pride.Util.Paginater.hasKey('bloop')).toBe(false);
      });
    });
  });
});
