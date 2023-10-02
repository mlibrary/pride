const fs = require('fs');
const glob = require('glob');

const outputFile = './output.js';

// delete output file if exists (otherwise it will continue appending)
fs.unlink(outputFile, function(err) {
  console.log(`${outputFile} has been removed`);
});

// concat all js files
glob('./source/**/*.js', {'ignore': ['./source/parser/**/*.js']}, function(err, files) {
  let importUnderscore = 0;
  files.forEach((file) => {
    fs.readFile(file, 'utf8', function(err, data){
      let editedDate = data;
      if (data.includes("import _ from 'underscore';")) {
        importUnderscore++;
      }
      if (importUnderscore > 1) {
        editedDate = data.replace("import _ from 'underscore';", '');
      }
      fs.appendFileSync(outputFile, editedDate);
    });
  });
});
