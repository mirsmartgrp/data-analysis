'use strict';

var path = require('path');
var fs = require('fs-extra'); // --> require('fs')
var walk = require('walk');
var log = require('./log');
var digest = require('./digest');
var generator = require('./generator');

module.exports = function(root) {
  fs.remove('dist', function(error) {
    if (error) {
      log.warn('Error purging dist directory.');
    }
  });

  var walker = walk.walk(path.join(root, 'data'), {followLinks: false});
  walker.on('file', function(root2, stat, next) {
      var file = path.join(root2, stat.name);

      fs.readJson(file, 'utf8', function(error, contents) {
        if (error) {
          log.error('Could not read file ' + path.join(root2, stat.name));
        } else {
          var data = digest(contents);

          var src = path.join(root, 'template');
          var dest = path.join(root, 'dist', path.basename(stat.name, path.extname(stat.name)));
          generator(src, dest, data);

          next();
        }
      });
  });
};
