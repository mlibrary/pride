import { expect } from 'chai';
import isDeepMatch from './isDeepMatch';

describe('isDeepMatch()', () => {
  describe('returning false', () => {
    it('treats strings as not equal to numbers', () => {
      expect(isDeepMatch('7', 7)).to.be.false;
    });

    it('treats strings that have different content as not equal', () => {
      expect(isDeepMatch('this is a string', 'nope')).to.be.false;
    });

    it('treats numbers that are different as not equal', () => {
      expect(isDeepMatch(45, 999)).to.be.false;
    });

    it('treats objects with different lengths as not equal', () => {
      expect(isDeepMatch(
        { x: 1 },
        { x: 1, y: 2 }
      )).to.be.false;
    });

    it('treats arrays with different lengths as not equal', () => {
      expect(isDeepMatch(
        [1, 2],
        [1, 2, 3]
      )).to.be.false;
    });

    it('treats arrays different content as not equal', () => {
      expect(isDeepMatch(
        [1, 'two', 33],
        [1, 'two', 325768432]
      )).to.be.false;
    });

    it('treats objects with different content as not equal', () => {
      expect(isDeepMatch(
        { x: 12, y: 'hmmmm' },
        { x: 12, y: 'yup' }
      )).to.be.false;
    });

    it('treats objects with different keys as not equal', () => {
      expect(isDeepMatch(
        { x: 12, j: 'yup' },
        { x: 12, kay: 'yup' }
      )).to.be.false;
    });

    it('treats nested unequal arrays as not equal', () => {
      expect(isDeepMatch(
        [1, ['two', 33]],
        [1, ['fizzle', 33]]
      )).to.be.false;
    });

    it('treats nested unequal arrays as not equal', () => {
      expect(isDeepMatch(
        { x: 'q', y: { q: 33 } },
        { x: 'q', y: { q: 684465465 } }
      )).to.be.false;
    });

    it('works when nesting arrays or objects', () => {
      expect(isDeepMatch(
        { x: 'q', y: [11, 'yup', { a: 33, b: 9, c: [1, 168468, 3] }] },
        { x: 'q', y: [11, 'yup', { a: 33, b: 9, c: [1, 'nope', 3] }] }
      )).to.be.false;
    });
  });

  describe('returning true', () => {
    it('treats strings that have the same content as equal', () => {
      expect(isDeepMatch('this is a string', 'this is a string')).to.be.true;
    });

    it('treats numbers that are the same as equal', () => {
      expect(isDeepMatch(45, 45)).to.be.true;
    });

    it('treats empty objects as equal', () => {
      expect(isDeepMatch({}, {})).to.be.true;
    });

    it('treats empty arrays as equal', () => {
      expect(isDeepMatch([], [])).to.be.true;
    });

    it('treats arrays with the same content as equal', () => {
      expect(isDeepMatch(
        [1, 'two', 33],
        [1, 'two', 33]
      )).to.be.true;
    });

    it('treats objects with the same content as equal', () => {
      expect(isDeepMatch(
        { x: 12, y: 'why?!' },
        { x: 12, y: 'why?!' }
      )).to.be.true;
    });

    it('treats objects with functions as equal as long as the functions have the same names', () => {
      expect(isDeepMatch(
        { f: () => true },
        { f: () => false }
      )).to.be.true;
    });

    it('treats nested arrays as equal if the content is the same', () => {
      expect(isDeepMatch(
        [1, ['two', 33]],
        [1, ['two', 33]]
      )).to.be.true;
    });

    it('treats nested objects as equal if the content is the same', () => {
      expect(isDeepMatch(
        { x: 'q', y: { a: 33, b: 9 } },
        { x: 'q', y: { a: 33, b: 9 } }
      )).to.be.true;
    });

    it('allows arrays and objects that are nested', () => {
      expect(isDeepMatch(
        { x: 'q', y: [11, 'yup', { a: 33, b: 9, c: [1, 2, 3] }] },
        { x: 'q', y: [11, 'yup', { a: 33, b: 9, c: [1, 2, 3] }] }
      )).to.be.true;
    });
  });
});
