_ = require('./libraries/underscore')
require('./pride')
var strings = [
  'A',
  'A B',
  'A AND B',
  'A AND B C',
  'title:A AND author:B',
  'title:A AND B',
  'title:A AND author:B C',
  'title:A B AND author:C',
  'A title:B C AND author:D E',
  '"A AND B"',
  'title:A AND author:B C',
  "Grey's anatomy",
  'A AND B OR C',
  'A OR B AND C',
]

for (var i in strings) {
  var string = strings[i]
  console.log("string: " + string)
  try { console.log(Pride.FieldTree.parseField('field', string)) }
  catch (e) { console.log(e) }
  console.log('')
}

