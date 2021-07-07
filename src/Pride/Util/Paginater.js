import _ from 'underscore';
import getPossibleKeys from './Paginater/getPossibleKeys';
import hasKey from './Paginater/hasKey';

const Paginater = function(initialValues) {
  this.set = function(newValues) {
    /*
     * Basic error checks
     */

    if (_.has(newValues, 'total_pages')) {
      throw new Error('Can not set total_pages (it is a calculated value)');
    }

    if (_.has(newValues, 'index_limit')) {
      throw new Error('Can not set index_limit (it is a calculated value)');
    }

    if (_.intersection(['start', 'end', 'count'], _.keys(newValues)).length > 2) {
      throw new Error('Can not set start, end and count all at the same time');
    }

    if (
      _.has(newValues, 'page') &&
      (_.has(newValues, 'start') || _.has(newValues, 'end'))
    ) {
      throw new Error('Can not set page as well as the start and/or end');
    }

    /*
     * Set and calculate values
     */

    // We wait to set the new end value until after an exception can be thrown.
    _.extend(values, _.omit(newValues, 'end'));

    // If the page is being set, we have to update the start.
    if (_.has(newValues, 'page')) {
      values.start = (values.count || 0) * (values.page - 1);
    }

    // If the end is being set, we calculate what start or count should now be.
    if (_.has(newValues, 'end')) {
      if (!_.has(newValues, 'count')) {
        /*
         * Throw an error if the start now comes after the end,
         * because that makes no sense at all.
         */
        if (values.start > newValues.end) {
          throw new Error('The start value can not be greater than the end value');
        }
        // If we are not setting the count, calculate a new count.
        values.count = (newValues.end - values.start) + 1;
      } else {
        // If we are also setting the count, calculate a new start.
        values.start = Math.max(0, newValues.end - (values.count - 1));
      }

      // Now it is safe to set the end
      values.end = newValues.end;
    } else {
      // Calculate what the new end value should be.
      const end = values.start + values.count - 1;
      values.end = (end < values.start) ? undefined : end;
    }

    /*
     * Check to make sure enough is set
     */

    if (!_.has(values, 'start') || !_.has(values, 'count')) {
      throw new Error('Not enough information given to create Paginater');
    }

    // Calculate what the last index can be.
    values.index_limit = undefined;
    if (!_.isNumber(values.total_available)) {
      values.index_limit = Infinity;
    }
    if (values.total_available > 0) {
      values.index_limit = values.total_available - 1;
    }

    /*
     * Calculate pagination
     */

    values.page = undefined;
    values.total_pages = undefined;
    values.page_limit = undefined;
    if (values.count > 0 && values.start % values.count === 0) {
      values.page = Math.floor(values.start / values.count) + 1;
      values.total_pages = undefined;
      values.page_limit = Infinity;
      if (_.isNumber(values.total_available)) {
        values.total_pages = Math.ceil(values.total_available / values.count);
        values.page_limit = values.total_pages;
      }
    }

    return this;
  };

  this.get = (name) => values[name];

  // Set the initial values.
  const values = {};
  this.set(initialValues);
};

Paginater.prototype.getPossibleKeys = () => getPossibleKeys();
Paginater.prototype.hasKey = (key) => hasKey(key);

export default Paginater;
