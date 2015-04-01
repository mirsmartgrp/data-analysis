'use strict';

var path = require('path');
var fs = require('fs-extra'); // --> require('fs')
var Handlebars = require('handlebars');
var helper = require('./helper');
var walk = require('walk');
var log = require('./log');

function generate(src, dest, data, next) {
  fs.readFile(src, 'utf8', function(error, contents) {
    if (error) {
      log.info('error');
    } else {
      var template = Handlebars.compile(contents);
      var output = template(data);

      fs.outputFile(dest, output, function(error2) {
        if (error2) {
          log.error('Could not write file ' + dest);
        } else {
          next();
        }
      });
    }
  });
}

module.exports = function(src, dest, data) {
  log.info('Generating report.');

  // register Handlebars helper functions
  helper.register();

  var walker = walk.walk(src, {followLinks: false});
  walker.on('file', function(root, stat, next) {
    var src2 = path.join(root, stat.name);
    var dest2 = path.join(dest, path.basename(stat.name, path.extname(stat.name))) + '.html';

    generate(src2, dest2, data, next);
  });
};
