const { expect } = require('chai');
const Section = require('../../../pride').Pride.Util.Section;

describe('Pride.Util.Section', function () {
  const start = 55;
  const end = 978;
  const amount = 11;
  const example = new Section(start, end);

  describe('initialized values are validated and corrected', function () {
    describe('with correct parameter order', function () {
      it('sets start at init', function () {
        expect(example.start).to.equal(start);
      });

      it('sets end at init', function () {
        expect(example.end).to.equal(end);
      });
    });

    describe('with reversed parameter order', function () {
      const anotherExample = new Section(end, start);

      it('always sets start to the smaller number', function () {
        expect(anotherExample.start).to.equal(start);
      });

      it('always sets end to the larger number', function () {
        expect(anotherExample.end).to.equal(end);
      });
    });

    it('sets the start to zero if one of the numbers is negative', function () {
      const anotherExample = new Section(-9, 3);
      expect(anotherExample.start).to.equal(0);
    });

    it('sets the end to zero if both of the numbers are negative', function () {
      const anotherExample = new Section(-99, -1999);
      expect(anotherExample.end).to.equal(0);
    });
  });

  describe('inSection()', function () {
    it('returns true if the value is inside the section', function () {
      expect(example.inSection(157)).to.be.true;
    });

    it('returns true if the value is the start the section', function () {
      expect(example.inSection(start)).to.be.true;
    });

    it('returns true if the value is the end the section', function () {
      expect(example.inSection(end)).to.be.true;
    });

    it('returns false if the value is the past the end', function () {
      expect(example.inSection(end + 1)).to.be.false;
    });

    it('returns false if the value is the before the start', function () {
      expect(example.inSection(start - 1)).to.be.false;
    });
  });

  describe('overlaps()', function () {
    const innerSection = new Section(start + 3, end - 3);

    it('returns true if the two sections overlap by one at the end', function () {
      expect(example.overlaps(new Section(end - 1, end + 4))).to.be.true;
    });

    it('returns true if the two sections overlap by more than one at the end', function () {
      expect(example.overlaps(new Section(end - 4, end + 4))).to.be.true;
    });

    it('returns true if the two sections overlap by one at the start', function () {
      expect(example.overlaps(new Section(start - 4, start + 1))).to.be.true;
    });

    it('returns true if the two sections overlap by more than one at the start', function () {
      expect(example.overlaps(new Section(start - 4, start + 4))).to.be.true;
    });

    it('returns true if one section is inside of the other section', function () {
      expect(example.overlaps(innerSection)).to.be.true;
    });

    it('returns true if one section contains the other section', function () {
      expect(example.overlaps(innerSection)).to.be.true;
    });

    it('returns false if one section comes before the other section', function () {
      expect(example.overlaps(new Section(start - 10, start - 15))).to.be.false;
    });

    it('returns false if one section comes after the other section', function () {
      expect(example.overlaps(new Section(end + 20, end + 25))).to.be.false;
    });
  });

  describe('calcLength()', function () {
    it('gives the length of the section', function () {
      expect((new Section(35, 40)).calcLength()).to.equal(6);
    });

    it('gives the length of the section, even when given the start and end out of order', function () {
      expect((new Section(100, 27)).calcLength()).to.equal(74);
    });
  });

  describe('shifted()', function () {
    const shiftedTogether = example.shifted(amount);
    const anotherAmount = amount + 4;
    const shiftedSeparately = example.shifted(amount, anotherAmount);

    it('returns a new object', function () {
      expect(example.shifted(amount)).not.to.equal(example);
    });

    it('given one number, moves the start forward by that amount', function () {
      expect(shiftedTogether.start).to.equal(start + amount);
    });

    it('given one number, moves the end forward by that amount', function () {
      expect(shiftedTogether.end).to.equal(end + amount);
    });

    it('can move the start seperatly from the end', function () {
      expect(shiftedSeparately.start).to.equal(start + amount);
    });

    it('can move the end seperatly from the start', function () {
      expect(shiftedSeparately.end).to.equal(end + anotherAmount);
    });
  });

  describe('expanded()', function () {
    const expanded = example.expanded(amount);

    it('returns a new object', function () {
      expect(example.expanded(amount)).not.to.equal(example);
    });

    it('moves the start backwards', function () {
      expect(expanded.start).to.equal(start - amount);
    });

    it('moves the end forwards', function () {
      expect(expanded.end).to.equal(end + amount);
    });
  });
});
