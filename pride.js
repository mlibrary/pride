// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.init({success: function() {
  mirlyn    = Pride.AllDatastores.newSearch('mirlyn');
  databases = Pride.AllDatastores.newSearch('databases');
}});
