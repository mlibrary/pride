import _ from 'underscore';

const Section = function(start, end) {
  this.start = Math.max(Math.min(start, end), 0);
  this.end = Math.max(Math.max(start, end), 0);

  this.inSection = function(index) {
    return index >= this.start &&
           index <= this.end;
  };

  this.overlaps = function(section) {
    return this.inSection(section.start) ||
           this.inSection(section.end);
  };

  this.calcLength = function() {
    return this.end - this.start + 1;
  };

  this.shifted = function(startAmount, endAmount) {
    if (!_.isNumber(endAmount)) endAmount = startAmount;
    return new Section(
      this.start + startAmount,
      this.end + endAmount
    );
  };

  this.expanded = function(amount) {
    return this.shifted(-1 * amount, amount);
  };
};

export default Section;
