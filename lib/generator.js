'use strict';

var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var Handlebars = require('handlebars');
var walk = require('walk');
var log = require('./log');

function generate(src, dest, data, next) {
  fs.readFile(src, 'utf8', function(error, contents) {
    if (error) {
      log.info('error');
    } else {
      var template = Handlebars.compile(contents);

      var output = template(data);

      write(dest, output, next);
    }
  });
}

function write(dest, contents, next) {
  var dir = path.dirname(dest);
  mkdirp(dir, function(error) {
    if (error) {
      log.error('Could not create directory ' + dir);
    } else {
      fs.writeFile(dest, contents, function(error2) {
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
  var walker = walk.walk(src, {followLinks: false});

  walker.on('file', function(root, stat, next) {
    var src2 = path.join(root, stat.name);
    var dest2 = path.join(dest, path.basename(stat.name, path.extname(stat.name))) + '.html';

    generate(src2, dest2, data, next);
  });
};
