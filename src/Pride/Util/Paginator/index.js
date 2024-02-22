import getPossibleKeys from './getPossibleKeys';

class Paginator {
  constructor (initialValues) {
    this.values = {
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
  }

  set (newValues) {
    // Basic error checks
    const newValueKeys = Object.keys(newValues);

    ['index_limit', 'total_pages'].forEach((property) => {
      if (newValueKeys.includes(property)) {
        throw new Error(`Cannot set ${property} (it is a calculated value)`);
      }
    });

    if (newValueKeys.includes('start') && newValueKeys.includes('end') && newValueKeys.includes('count')) {
      throw new Error('Cannot set start, end, and count all at the same time');
    }

    if (newValueKeys.includes('page') && (newValueKeys.includes('start') || newValueKeys.includes('end'))) {
      throw new Error('Cannot set page as well as the start and/or end');
    }

    // Set and calculate values
    newValueKeys.forEach((property) => {
      if (property !== 'end') {
        this.values[property] = newValues[property];
      }
    });

    if (newValueKeys.includes('page')) {
      this.values.start = this.values.count * (this.values.page - 1);
    }

    if (newValueKeys.includes('end')) {
      if (this.values.start >= newValues.end) {
        throw new Error('The start value cannot be greater than the end value');
      }

      if (newValueKeys.includes('count')) {
        this.values.start = Math.max(0, newValues.end - (this.values.count - 1));
      } else {
        this.values.count = (newValues.end - this.values.start) + 1;
      }

      this.values.end = newValues.end;
    } else {
      const end = this.values.start + this.values.count - 1;
      this.values.end = (end < this.values.start) ? this.values.end : end;
    }

    if (typeof this.values.total_available === 'number' && this.values.total_available > 0) {
      this.values.index_limit = this.values.total_available - 1;
    }

    // Calculate pagination
    if (this.values.count > 0 && this.values.start % this.values.count === 0) {
      this.values.page = Math.floor(this.values.start / this.values.count) + 1;

      if (typeof this.values.total_available === 'number') {
        this.values.total_pages = Math.ceil(this.values.total_available / this.values.count);
        this.values.page_limit = this.values.total_pages;
      }
    }

    // Check to make sure enough is set
    if (!('start' in this.values) || !('count' in this.values)) {
      throw new Error('Not enough information given to create Paginator');
    }

    return this;
  }

  get (name) {
    return this.values[name];
  }
}

Paginator.getPossibleKeys = getPossibleKeys;

export default Paginator;
