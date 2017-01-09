// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import { _ } from 'underscore';

Pride.AllDatastores = {
  array: [],

  newSearch: function(uid) {
    var datastore = _.find(
                      this.array,
                      function(datastore) { return datastore.get('uid') == uid; }
                    );

    return datastore ? datastore.baseSearch() : undefined;
  },

  each: function(func) {
    _.each(this.array, func);

    return this;
  }
};
