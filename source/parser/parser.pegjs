{
  var defaultFieldName = options.defaultFieldName || 'all_fields';

  // https://pegjs.org/online
  //
  // var Pride = function(){};
  // Pride.FieldTree = function(){};
  // Pride.FieldTree.Literal = function(str) {
  //   this.string =  str;
  //   function toString() {
  //     return string;
  //   }
  // }
  // Pride.FieldTree.Field = function(a,lst) {
  //   this.field = a; this.val = lst.map(function(x){return x.string}).join(" ");
  //   function toString() {
  //     return field + ":(" + lst.join(" ") + ")";
  //   }
  // }
  // Pride.FieldTree.FieldBoolean = function(a,b,c) { return [a, b, c];}
}
start
  = c:coordination OPTSPACE { return c; }

coordination
  = cl:clause _ con:conj _ co:coordination { return new Pride.FieldTree.FieldBoolean(con, cl, co); }
  / cl:clause_list

clause_list
  = clause
  / first:clause rest:(clause_rest)? { if (rest) { return [first, rest]; } else { return first; } }

clause_rest
  = _ rest:clause_list { return rest; }

clause
  = fieldName:field ":" list:literal_list { return new Pride.FieldTree.Field(fieldName, list); }
  / list:literal_list { return new Pride.FieldTree.Field(defaultFieldName, list); }

field
  = string:FIELDCHAR+ { return string.join(''); }

literal_list
  = first:literal rest:(literal_rest)?  { if (rest) { return first.concat( rest ); } else { return first; } }

literal_rest
  = _ rest:literal_list { return rest; }

literal
  = !CONJ first:WORD rest:QWORD+ { return [new Pride.FieldTree.Literal(first + rest.join(''))]; }
  / !CONJ string:WORD+ { return [new Pride.FieldTree.Literal(string.join(''))]; }
  / SQUOTE literal:NONSQUOTE* SQUOTE { return [new Pride.FieldTree.Literal('"' + literal.join('') + '"')]; }
  / DQUOTE literal:NONDQUOTE* DQUOTE { return [new Pride.FieldTree.Literal('"' + literal.join('') + '"')]; }

conj
  = conj:CONJ { return conj; }

CONJ
  = "AND"
  / "OR"
  / "NOT"

SQUOTE = "'"
NONSQUOTE = [^']

DQUOTE = '"'
NONDQUOTE = [^"]

FIELDCHAR = [^ \t\r\n:'"()]
QWORD = [^ \t\r\n():]
WORD  = [^ \t\r\n'"():]

_ = [ \t\r\n]+
SPACES = _
OPTSPACE = SPACES?
