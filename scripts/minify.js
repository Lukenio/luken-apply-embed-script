

const fs = require('fs-extra');
const path = require('path');
const UglifyJS = require('uglify-js');
const CleanCSS = require('clean-css');

// JS

fs.outputFileSync(
  path.join(__dirname, '../dist/embed.min.js'),
  UglifyJS.minify(
    fs.readFileSync(
      path.join(__dirname, '../dist/embed.js'), { encoding: 'utf8' }
    ).replace(/http:\/\/localhost:\d{4}/g, 'https://app.loanz.io')
  ).code
);

// CSS

fs.outputFileSync(
  path.join(__dirname, '../dist/embed.min.css'),
  new CleanCSS().minify(
    fs.readFileSync(
      path.join(__dirname, '../dist/embed.css'), { encoding: 'utf8' }
    )
  ).styles
);
