import { expect } from 'chai';
import Section from './Section';

describe.only('Section', function() {
  it('does a thing', () => {
    console.log(Section);
    expect(Section).to.not.be.null;
  });
  /*
   * beforeAll(function() {
   *   this.start = 7;
   *   this.end = 10;
   * });
   */

  /*
   * describe('initialized values are validated and corrected', function() {
   *   describe('with correct parameter order', function() {
   *     beforeAll(function() {
   *       this.example = new Section(this.start, this.end);
   *     });
   */

  /*
   *     it('sets start at init', function() {
   *       expect(this.example.start).toEqual(this.start);
   *     });
   */

  /*
   *     it('sets end at init', function() {
   *       expect(this.example.end).toEqual(this.end);
   *     });
   *   });
   */

  /*
   *   describe('with reversed parameter order', function() {
   *     beforeAll(function() {
   *       this.example = new Section(this.end, this.start);
   *     });
   */

  /*
   *     it('always sets start to the smaller number', function() {
   *       expect(this.example.start).toEqual(this.start);
   *     });
   */

  /*
   *     it('always sets end to the larger number', function() {
   *       expect(this.example.end).toEqual(this.end);
   *     });
   *   });
   */

  /*
   *   it('sets the start to zero if one of the numbers is negative', function() {
   *     const example = new Section(-9, 3);
   *     expect(example.start).toEqual(0);
   *   });
   */

  /*
   *   it('sets the end to zero if both of the numbers are negative', function() {
   *     const example = new Section(-99, -1999);
   *     expect(example.end).toEqual(0);
   *   });
   * });
   */

  /*
   * describe('inSection()', function() {
   *   beforeEach(function() {
   *     this.start = 105;
   *     this.end = 200;
   *     this.inside = 157;
   *     this.example = new Section(this.start, this.end);
   *   });
   */

  /*
   *   it('returns true if the value is inside the section', function() {
   *     expect(this.example.inSection(this.inside)).toBe(true);
   *   });
   */

  /*
   *   it('returns true if the value is the start the section', function() {
   *     expect(this.example.inSection(this.start)).toBe(true);
   *   });
   */

  /*
   *   it('returns true if the value is the end the section', function() {
   *     expect(this.example.inSection(this.end)).toBe(true);
   *   });
   */

  /*
   *   it('returns false if the value is the past the end', function() {
   *     expect(this.example.inSection(this.end + 1)).toBe(false);
   *   });
   */

  /*
   *   it('returns false if the value is the before the start', function() {
   *     expect(this.example.inSection(this.start - 1)).toBe(false);
   *   });
   * });
   */

  /*
   * describe('overlaps()', function() {
   *   beforeEach(function() {
   *     this.start = 500;
   *     this.end = 600;
   *     this.example = new Section(this.start, this.end);
   *     this.inner_section = new Section(this.start + 3, this.end - 3);
   *   });
   */

  /*
   *   it('returns true if the two sections overlap by one at the end', function() {
   *     expect(
   *       this.example.overlaps(new Section(this.end - 1, this.end + 4))
   *     ).toBe(true);
   *   });
   */

  /*
   *   it('returns true if the two sections overlap by more than one at the end', function() {
   *     expect(
   *       this.example.overlaps(new Section(this.end - 4, this.end + 4))
   *     ).toBe(true);
   *   });
   */

  /*
   *   it('returns true if the two sections overlap by one at the start', function() {
   *     expect(
   *       this.example.overlaps(new Section(this.start - 4, this.start + 1))
   *     ).toBe(true);
   *   });
   */

  /*
   *   it('returns true if the two sections overlap by more than one at the start', function() {
   *     expect(
   *       this.example.overlaps(new Section(this.start - 4, this.start + 4))
   *     ).toBe(true);
   *   });
   */

  /*
   *   it('returns true if one section is inside of the other section', function() {
   *     expect(
   *       this.example.overlaps(this.inner_section)
   *     ).toBe(true);
   *   });
   */

  /*
   *   it('returns true if one section contains the other section', function() {
   *     expect(
   *       this.example.overlaps(this.inner_section)
   *     ).toBe(true);
   *   });
   */

  /*
   *   it('returns false if one section comes before the other section', function() {
   *     expect(
   *       this.example.overlaps(new Section(this.start - 10, this.start - 15))
   *     ).toBe(false);
   *   });
   */

  /*
   *   it('returns false if one section comes after the other section', function() {
   *     expect(
   *       this.example.overlaps(new Section(this.end + 20, this.end + 25))
   *     ).toBe(false);
   *   });
   * });
   */

  /*
   * describe('calcLength()', function() {
   *   it('gives the length of the section', function() {
   *     expect((new Section(35, 40)).calcLength()).toEqual(6);
   *   });
   */

  /*
   *   it('gives the length of the section, even when given the start and end out of order', function() {
   *     expect((new Section(100, 27)).calcLength()).toEqual(74);
   *   });
   * }
   * );
   */

  /*
   * describe('expanded()', function() {
   *   beforeEach(function() {
   *     this.start = 6;
   *     this.end = 14;
   *     this.amount = 3;
   *     this.example = new Section(this.start, this.end);
   *     this.expanded = this.example.expanded(this.amount);
   *   });
   */

  /*
   *   it('returns a new object', function() {
   *     expect(this.example.expanded(this.amount)).not.toEqual(this.example);
   *   });
   */

  /*
   *   it('moves the start backwards', function() {
   *     expect(this.expanded.start).toEqual(this.start - this.amount);
   *   });
   */

  /*
   *   it('moves the end forwards', function() {
   *     expect(this.expanded.end).toEqual(this.end + this.amount);
   *   });
   * }
   * );
   */

  /*
   * describe('shifted()', function() {
   *   beforeEach(function() {
   *     this.start = 55;
   *     this.end = 978;
   *     this.amount = 11;
   *     this.example = new Section(this.start, this.end);
   */

  //     this.shifted_together = this.example.shifted(this.amount);

  /*
   *     this.another_amount = this.amount + 4;
   *     this.shifted_separately = this.example.shifted(this.amount, this.another_amount);
   *   });
   */

  /*
   *   it('returns a new object', function() {
   *     expect(this.example.shifted(this.amount)).not.toEqual(this.example);
   *   });
   */

  /*
   *   it('given one number, moves the start forward by that amount', function() {
   *     expect(this.shifted_together.start).toEqual(this.start + this.amount);
   *   });
   */

  /*
   *   it('given one number, moves the end forward by that amount', function() {
   *     expect(this.shifted_together.end).toEqual(this.end + this.amount);
   *   });
   */

  /*
   *   it('can move the start seperatly from the end', function() {
   *     expect(this.shifted_separately.start).toEqual(this.start + this.amount);
   *   });
   */

  /*
   *   it('can move the end seperatly from the start', function() {
   *     expect(this.shifted_separately.end).toEqual(this.end + this.another_amount);
   *   });
   * });
   */
});
