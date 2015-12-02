// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.utils.slice = function(array, begin, end) {
  return Array.prototype.slice.call(array, begin, end);
};
