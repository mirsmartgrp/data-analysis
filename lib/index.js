'use strict';

var path = require('path');
var fs = require('fs');
var walk = require('walk');
var log = require('./log');
var digest = require('./digest');
var generator = require('./generator');

module.exports = function(root) {
  var walker = walk.walk(path.join(root, 'data'), {followLinks: false});

  walker.on('file', function(root2, stat, next) {
      var file = path.join(root2, stat.name);

      fs.readFile(file, 'utf8', function(error, contents) {
        if (error) {
          log.error('Could not read file ' + path.join(root2, stat.name));
        } else {
          var json = JSON.parse(contents);
          var data = digest(json);

          var src = path.join(root, 'template');
          var dest = path.join(root, 'dist', path.basename(stat.name, path.extname(stat.name)));
          generator(src, dest, data);

          next();
        }
      });
  });
};
