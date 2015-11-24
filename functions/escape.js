// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.utils.escape = function(string) {
  var temp_element = document.createElement('div');
  temp_element.appendChild(document.createTextNode(string));

  return temp_element.innerHTML;
};
