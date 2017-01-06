// Copyright (c) 2017, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Albert Bertram (bertrama@umich.edu)
Pride.requestRecord = function(source, id, func) {
  if (func === undefined) {
    func = function(data) {};
  }
  data = {
    complete: false,
    source: Pride.Settings.datastores_url + '/' + source + '/record/' + id,
    names: [ undefined ]
  };
  record = new Pride.Core.Record(data);
  record.renderFull(func);
  return record;
};

