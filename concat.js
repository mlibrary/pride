const fs = require('fs');
const glob = require('glob');

const outputFile = './output.js';

// Delete the output file if it exists
fs.unlink(outputFile, function(err) {
  console.log(`${outputFile} has been removed`);
});

// Concatenate all `./source` JavaScript files in a certain order, excluding files under `./source/parser`
glob('./source/*/**/*.js', {'ignore': ['./source/parser/**/*.js']}, function(err, files) {
  let importUnderscore = 0;
  ['./source/initial_setup.js', './source/settings.js', ...files].forEach((file) => {
    fs.readFile(file, 'utf8', function(err, data){
      let editedDate = data;
      if (data.includes("import _ from 'underscore';")) {
        importUnderscore++;
      }
      // Remove importing `underscore` if already been done
      if (importUnderscore > 1) {
        editedDate = data.replace("import _ from 'underscore';", '');
      }
      fs.appendFileSync(outputFile, editedDate);
    });
  });
});
