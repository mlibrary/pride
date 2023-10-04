const fs = require('fs');
const { globSync } = require('glob');
const execFile = process.env.BUNDLE === 'exec';
const outputFile = execFile ? 'output-exec.js' : 'output.js';

// Delete the output file
fs.unlinkSync(outputFile);
console.log(`${outputFile} has been removed`);

let importUnderscore = 0;
// Grab all file names, excluding files under `./source/parser`
const files = globSync('source/*/**/*.js', { ignore: ['source/parser/**/*.js'] });
// Sort in alphabetical order 
files.sort();
// Concatenate all `./source` JavaScript files in a certain order
['source/initial_setup.js', 'source/settings.js', ...files].forEach((file) => {
  const data = fs.readFileSync(file, { encoding: 'utf8' });
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
