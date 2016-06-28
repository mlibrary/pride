// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

describe('deepClone()', function() {
  it('passes functions straigh through', function() {
    var func   = function() {};
    var cloned = Pride.Util.deepClone(func);

    expect(cloned == func).toBe(true);
  });

  it('returns a new instance of objects', function() {
    var object = {};
    var cloned = Pride.Util.deepClone(object);

    expect(typeof(cloned)).toEqual('object');
    expect(cloned == object).toBe(false);

  });

  it('returns a new instance of arrays', function() {
    var array  = [];
    var cloned = Pride.Util.deepClone(array);

    expect(array instanceof Array).toBe(true);
    expect(cloned == array).toBe(false);
  });

  it('clones content of arrays', function() {
    var array  = [1, 'two', null];
    var cloned = Pride.Util.deepClone(array);

    expect(cloned[0]).toEqual(array[0]);
    expect(cloned[1]).toEqual(array[1]);
    expect(cloned[2]).toEqual(array[2]);
  });

  it('clones content of objects', function() {
    var object = {x: 1, y: 'two', z: null};
    var cloned = Pride.Util.deepClone(object);

    expect(cloned['x']).toEqual(object['x']);
    expect(cloned['y']).toEqual(object['y']);
    expect(cloned['z']).toEqual(object['z']);
  });

  it('clones nested content', function() {
    var object = {x: 1, y: ['one', {q: 'two'}, 3], z: null};
    var cloned = Pride.Util.deepClone(object);

    expect(cloned['y'][1]['q']).toEqual(cloned['y'][1]['q']);
  });
});
