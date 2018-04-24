

const fs = require('fs-extra');
const path = require('path');

// JS

const files = [
  'main.js'
];

const combinedContent = files.reduce((output, filename) => {
  return output + fs.readFileSync(
    path.join(__dirname, `../code/${filename}`),
    { encoding: 'utf8' }
  ).trim();
}, '');

fs.outputFileSync(
  path.join(__dirname, '../dist/embed.js'),
  `
  (function (window, document) {
    'use strict';
    ${combinedContent}
  }(window, document));
  `
);

fs.copySync(
  path.join(__dirname, '../dist/embed.js'),
  path.join(__dirname, '../example/embed/embed.js')
);

// CSS

fs.copySync(
  path.join(__dirname, '../code/style.css'),
  path.join(__dirname, '../dist/embed.css')
);

fs.copySync(
  path.join(__dirname, '../dist/embed.css'),
  path.join(__dirname, '../example/embed/embed.css')
);
