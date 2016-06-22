// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

describe("isDeepMatch()", function() {
  describe("returning false", function() {
    it('treats strings as not equal to numbers', function() {
      expect(Pride.Util.isDeepMatch("7", 7)).toBe(false);
    });

    it('treats strings that have different content as not equal', function() {
      expect(Pride.Util.isDeepMatch("this is a string", "nope")).toBe(false);
    });

    it('treats numbers that are different as not equal', function() {
      expect(Pride.Util.isDeepMatch(45, 999)).toBe(false);
    });

    it('treats objects with different lengths as not equal', function() {
      expect(Pride.Util.isDeepMatch(
        {x: 1},
        {x: 1, y: 2}
      )).toBe(false);
    });

    it('treats arrays with different lengths as not equal', function() {
      expect(Pride.Util.isDeepMatch(
        [1, 2],
        [1, 2, 3]
      )).toBe(false);
    });

    it('treats arrays different content as not equal', function() {
      expect(Pride.Util.isDeepMatch(
        [1, 'two', 33],
        [1, 'two', 325768432]
      )).toBe(false);
    });

    it('treats objects with different content as not equal', function() {
      expect(Pride.Util.isDeepMatch(
        {x: 12, y: 'hmmmm'},
        {x: 12, y: 'yup'}
      )).toBe(false);
    });

    it('treats objects with different keys as not equal', function() {
      expect(Pride.Util.isDeepMatch(
        {x: 12, j:   'yup'},
        {x: 12, kay: 'yup'}
      )).toBe(false);
    });

    it('treats nested unequal arrays as not equal', function() {
      expect(Pride.Util.isDeepMatch(
        [1, ['two',    33]],
        [1, ['fizzle', 33]]
      )).toBe(false);
    });

    it('treats nested unequal arrays as not equal', function() {
      expect(Pride.Util.isDeepMatch(
        {x: 'q', y: {q: 33}},
        {x: 'q', y: {q: 684465465}}
      )).toBe(false);
    });

    it('works when nesting arrays or objects', function() {
      expect(Pride.Util.isDeepMatch(
        {x: 'q', y: [11, 'yup', {a: 33, b: 9, c: [1,168468,3]}]},
        {x: 'q', y: [11, 'yup', {a: 33, b: 9, c: [1,'nope',3]}]}
      )).toBe(false);
    });
  });

  describe("returning true", function() {
    it('treats strings that have the same content as equal', function() {
      expect(Pride.Util.isDeepMatch("this is a string", "this is a string")).toBe(true);
    });

    it('treats numbers that are the same as equal', function() {
      expect(Pride.Util.isDeepMatch(45, 45)).toBe(true);
    });

    it('treats empty objects as equal', function() {
      expect(Pride.Util.isDeepMatch({}, {})).toBe(true);
    });

    it('treats empty arrays as equal', function() {
      expect(Pride.Util.isDeepMatch([], [])).toBe(true);
    });

    it('treats arrays with the same content as equal', function() {
      expect(Pride.Util.isDeepMatch(
        [1, 'two', 33],
        [1, 'two', 33]
      )).toBe(true);
    });

    it('treats objects with the same content as equal', function() {
      expect(Pride.Util.isDeepMatch(
        {x: 12, y: 'why?!'},
        {x: 12, y: 'why?!'}
      )).toBe(true);
    });

    it('treats objects with functions as equal as long as the functions have the same names', function() {
      expect(Pride.Util.isDeepMatch(
        {f: function() { return true;  }},
        {f: function() { return false; }}
      )).toBe(true);
    });

    it('treats nested arrays as equal if the content is the same', function() {
      expect(Pride.Util.isDeepMatch(
        [1, ['two', 33]],
        [1, ['two', 33]]
      )).toBe(true);
    });

    it('treats nested objects as equal if the content is the same', function() {
      expect(Pride.Util.isDeepMatch(
        {x: 'q', y: {a: 33, b: 9}},
        {x: 'q', y: {a: 33, b: 9}}
      )).toBe(true);
    });

    it('allows arrays and objects that are nested', function() {
          expect(Pride.Util.isDeepMatch(
        {x: 'q', y: [11, 'yup', {a: 33, b: 9, c: [1,2,3]}]},
        {x: 'q', y: [11, 'yup', {a: 33, b: 9, c: [1,2,3]}]}
      )).toBe(true);
    });
  });
});
