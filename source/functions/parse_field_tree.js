// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

Pride.FieldTree.parseField = function(field_name, content) {
  if (!content) {
    return {};
  } else {
    try {
      return Pride.Parser.parse(content, {defaultFieldName: field_name});
    }
    catch (e) {
      console.log(e);
      return new Pride.FieldTree.Field(
        field_name,
        new Pride.FieldTree.Literal(content)
      );
    }
  }
};
