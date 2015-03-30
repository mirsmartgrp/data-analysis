'use strict';

var path = require('path');
var fs = require('fs');
var walk = require('walk');
var log = require('./log');
var digest = require('./digest');

module.exports = function(dir) {
  var walker = walk.walk(dir, {followLinks: false});

  walker.on('file', function(root, stat, next) {
      var file = path.join(root, stat.name);

      fs.readFile(file, 'utf8', function(error, data) {
        if (error) {
          log.info('error');
        } else {
          var json = JSON.parse(data);
          digest(json);
          next();
        }
      });
  });
};
