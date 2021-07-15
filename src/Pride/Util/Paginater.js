import _ from 'underscore';
import getPossibleKeys from './Paginater/getPossibleKeys';
import hasKey from './Paginater/hasKey';

const Paginater = function(initialValues) {
  const values = {};

  this.get = (name) => values[name];

  this.set = function(newValues = initialValues) {
    // Get keys of new values
    const newValuesKeys = Object.keys(newValues);

    /*
     * Basic error checks
     */

    ['total_pages', 'index_limit'].forEach((property) => {
      if (newValuesKeys.includes(property)) {
        throw new Error(`Can not set ${property} (it is a calculated value)`);
      }
    });

    if (_.intersection(['start', 'end', 'count'], newValuesKeys).length > 2) {
      throw new Error('Can not set start, end and count all at the same time');
    }

    /*
     * Set and calculate values
     */

    // We wait to set the new end value until after an exception can be thrown.
    _.extend(values, _.omit(newValues, 'end'));

    // If the page is being set, we have to update the start.
    if (newValuesKeys.includes('page')) {
      if (newValuesKeys.includes('start') || newValuesKeys.includes('end')) {
        throw new Error('Can not set page as well as the start and/or end');
      }
      values.start = (values.count || 0) * (values.page - 1);
    }

    // If the end is being set, we calculate what start or count should now be.
    if (newValuesKeys.includes('end')) {
      if (!newValuesKeys.includes('count')) {
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

    const valuesKeys = Object.keys(values);

    if (!valuesKeys.includes('start') || !valuesKeys.includes('count')) {
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
    const countStart = values.count > 0 && values.start % values.count === 0;

    values.page = countStart ? Math.floor(values.start / values.count) + 1 : undefined;
    values.page_limit = countStart ? Infinity : undefined;
    values.total_pages = undefined;
    if (countStart && _.isNumber(values.total_available)) {
      values.page_limit = values.total_pages = Math.ceil(values.total_available / values.count);
    }

    return this;
  };

  // Set the initial values.
  this.set();
};

Paginater.prototype.getPossibleKeys = () => getPossibleKeys();
Paginater.prototype.hasKey = (key) => hasKey(key);

export default Paginater;
