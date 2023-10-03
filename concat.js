const fs = require('fs');
const glob = require('glob');
const execFile = process.env.BUNDLE === 'exec';
const outputFile = execFile ? './output-exec.js' : './output.js';

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
        // Remove importing `underscore` if already been done
        if (importUnderscore > 1 || execFile) {
          editedDate = data.replace("import _ from 'underscore';", '');
        }
      }
      // Replace certain strings for specs
      if (execFile) {
        if (data.includes("import reqwest from 'reqwest';")) {
          editedDate = data.replace("import reqwest from 'reqwest';", '');
        }
        if (data.includes('export')) {
          editedDate = data.replace('export', 'var reqwest = {};');
        }
      }
      fs.appendFileSync(outputFile, editedDate);
    });
  });
});
