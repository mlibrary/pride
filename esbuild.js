const fs = require('fs');
const glob = require('glob');

const outputFile = './out/output.js';

// delete output file if exists (otherwise it will continue appending)
fs.unlink(outputFile, function(err) {
  console.log('output.js is removed');
});

// concat all js files
glob('./source/**/*.js', {'ignore': ['./source/parser/**/*.js']}, function(err, files) {
  files.forEach((file, index) => {
    fs.readFile(file, 'utf8', function(err, data){
      fs.appendFileSync(outputFile, data);
    });
  });
});
