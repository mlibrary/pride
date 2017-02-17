// Copyright (c) 2017, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Albert Bertram (bertrama@umich.edu)
Pride.requestRecord = function(source, id, func) {
  if (func === undefined) {
    func = function(data) {};
  }
  var data = {
    complete: false,
    source: Pride.AllDatastores.get(source).get('url') + '/record/' + id,
    names: [ undefined ]
  };
  var record = new Pride.Core.Record(data);
  record.renderFull(func);
  return record;
};

