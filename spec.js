const fs = require('fs');

const oldData = fs.readFileSync('./pride.js').toString();
const newData =
`var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var { window } = new JSDOM();
var { document } = window;
` + oldData;
fs.writeFileSync('./pride.js', newData);
