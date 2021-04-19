/*
 * Copyright (c) 2021, Regents of the University of Michigan.
 * All rights reserved. See LICENSE.txt for details.
 */

// Authored by Albert Bertram (bertrama@umich.edu)

Pride.Core.Holdings = function(data) {
  this.data = data;

  const getResourceAccess = function(data) {
    const dataField = data.fields.find((field) => field.uid === 'resource_access');
    if (dataField && dataField.value) {
      return dataField.value
    }
    else {
      return dataField;
    }
  };

  const translateData = function(input) {
    return [getResourceAccess(data)].concat(input);
  };

  this.getData = function(func) {
    Pride.Util.safeCall(func, translateData(this.data.holdings));
  };
};
