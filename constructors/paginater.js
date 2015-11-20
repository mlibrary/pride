// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

var Pride = Pride || {};

Pride.Paginater = function(initial_values) {
  this.possibleKeys = function() {
    return [
             'start',
             'count',
             'end',
             'page',
             'index_limit',
             'total_pages',
             'total_available',
             'page_limit'
           ];
  };

  this.isPaginationKey = function(key) {
    return this.possibleKeys().indexOf(key) > -1;
  };

  this.set = function(new_values) {

    ////////////////////////
    // Basic error checks //
    ////////////////////////

    if (_.has(new_values, 'total_pages')) {
      throw 'Can not set total_pages (it is a calculated value)';
    }

    if (_.has(new_values, 'index_limit')) {
      throw 'Can not set index_limit (it is a calculated value)';
    }

    if (_.intersection(['start', 'end', 'count'], _.keys(new_values)).length > 2) {
      throw 'Can not set start, end and count all at the same time';
    }

    if (_.has(new_values, 'page') &&
        (_.has(new_values, 'start') || _.has(new_values, 'end'))
       ) {
      throw 'Can not set page while the start and/or end';
    }

    //////////////////////////////
    // Set and calculate values //
    //////////////////////////////

    _.extend(values, _.omit(new_values, 'end'));

    // If the page is being set, we have to update the start.
    if (_.has(new_values, 'page')) {
      if (values.count > 0) {
        values.start = values.count * (values.page - 1);
      } else {
        throw 'Can not set page if count is zero or undefined';
      }
    }

    // If the end is being set, we calculate what start or count should now be.
    if (_.has(new_values, 'end')) {
      if (_.has(new_values, 'count')) {
        // If we are also setting the count, calculate a new start.
        values.start = Math.max(
                         new_values.end,
                         new_values.end - (values.count - 1)
                       );
      // If we are not setting the count, calculate a new count.
      } else {
        // Throw an error if the start now comes after the end, because that
        // makes no sense at all.
        if (values.start <= new_values.end) {
          values.count = (new_values.end - values.start) + 1;
        } else {
          throw 'The start value can not be greater than the end value';
        }
      }

      // We wait to set the new end value until after an exception can be thrown.
      values.end = new_values.end;
    } else {
      // Calculate what the new end value should be.
      var end = values.start + values.count - 1;
      values.end = (end < values.start) ? undefined : end;
    }

    // Calculate what the last index can be.
    if (!_.isNumber(values.total_available)) {
      values.index_limit = Infinity;
    } else if (values.total_available > 0) {
      values.index_limit = values.total_available - 1;
    } else {
      values.index_limit = undefined;
    }

    //////////////////////////
    // Calculate pagination //
    //////////////////////////

    if (values.count > 0 && values.start % values.count === 0) {
      values.page = Math.floor(values.start / values.count) + 1;

      if (_.isNumber(values.total_available)) {
        values.total_pages = Math.ceil(values.total_available / values.count);
        values.page_limit  = values.total_pages;
      } else {
        values.total_pages = undefined;
        values.page_limit  = Infinity;
      }
    } else {
      values.page        = undefined;
      values.total_pages = undefined;
      values.page_limit  = undefined;
    }

    //////////////////////////////////////
    // Check to make sure enough is set //
    //////////////////////////////////////

    if (!_.has(values, 'start') || !_.has(values, 'count')) {
      throw 'Not enough information given to create Paginater';
    }

    return this;
  };

  this.get = function(name) {
    return values[name];
  };

  // Set the initial values.
  var values = {};
  this.set(initial_values);
};
