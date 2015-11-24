// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.utils.Section = function(start, end) {
  this.start = Math.max(Math.min(start, end), 0);
  this.end   = Math.max(Math.max(start, end), 0);

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

  this.expanded = function(amount) {
    return this.shifted(-1 * amount, amount);
  };

  this.shifted = function(start_amount, end_amount) {
    if (!_.isNumber(end_amount)) end_amount = start_amount;

    return new Pride.utils.Section(
             this.start + start_amount,
             this.end   + end_amount
           );
  };

  this.merge = function() {
    arguments.push(this);

    return new Pride.utils.Section(
             _.min(arguments, function(section) { return section.start; }),
             _.max(arguments, function(section) { return section.end;   })
           );
  };
};
