import getPossibleKeys from './getPossibleKeys';

const Paginater = function (initialValues) {
  this.set = function (newValues) {
    // ////////////////// //
    // Basic error checks //
    // ////////////////// //

    const newValueKeys = Object.keys(newValues);

    if (newValueKeys.includes('total_pages')) {
      throw new Error('Can not set total_pages (it is a calculated value)');
    }

    if (newValueKeys.includes('index_limit')) {
      throw new Error('Can not set index_limit (it is a calculated value)');
    }

    if (newValueKeys.includes('start') && newValueKeys.includes('end') && newValueKeys.includes('count')) {
      throw new Error('Can not set start, end and count all at the same time');
    }

    if (newValueKeys.includes('page') && (newValueKeys.includes('start') || newValueKeys.includes('end'))) {
      throw new Error('Can not set page as well as the start and/or end');
    }

    // //////////////////////// //
    // Set and calculate values //
    // //////////////////////// //

    // We wait to set the new end value until after an exception can be thrown.
    newValueKeys.forEach((property) => {
      if (property !== 'end') {
        values[property] = newValues[property];
      }
    });

    // If the page is being set, we have to update the start.
    if (newValueKeys.includes('page')) {
      values.start = values.count * (values.page - 1);
    }

    // If the end is being set, we calculate what start or count should now be.
    if (newValueKeys.includes('end')) {
      // Throw an error if the start now comes after the end.
      if (values.start >= newValues.end) {
        throw new Error('The start value can not be greater than the end value');
      }

      // If we are setting the count, calculate a new start.
      if (newValueKeys.includes('count')) {
        values.start = Math.max(0, newValues.end - (values.count - 1));
      // If we are not setting the count, calculate a new count.
      } else {
        values.count = (newValues.end - values.start) + 1;
      }

      // Now it is safe to set the end
      values.end = newValues.end;
    } else {
      // Calculate what the new end value should be.
      const end = values.start + values.count - 1;
      values.end = (end < values.start) ? values.end : end;
    }

    // Calculate what the last index can be.
    if (typeof values.total_available === 'number' && values.total_available > 0) {
      values.index_limit = values.total_available - 1;
    }

    // //////////////////// //
    // Calculate pagination //
    // //////////////////// //

    if (values.count > 0 && values.start % values.count === 0) {
      values.page = Math.floor(values.start / values.count) + 1;

      if (typeof values.total_available === 'number') {
        values.total_pages = Math.ceil(values.total_available / values.count);
        values.page_limit = values.total_pages;
      }
    }

    // //////////////////////////////// //
    // Check to make sure enough is set //
    // //////////////////////////////// //

    const valuesKeys = Object.keys(values);

    if (!valuesKeys.includes('start') || !valuesKeys.includes('count')) {
      throw new Error('Not enough information given to create Paginater');
    }

    return this;
  };

  this.get = function (name) {
    return values[name];
  };

  // Set the initial values.
  const values = {
    count: 0,
    end: 0,
    index_limit: Infinity,
    page: 0,
    page_limit: Infinity,
    start: 0,
    total_available: undefined,
    total_pages: undefined
  };
  this.set(initialValues);
};

Paginater.getPossibleKeys = getPossibleKeys;

export default Paginater;
