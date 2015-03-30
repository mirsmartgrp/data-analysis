'use strict';

var log = require('../log');
var util = require('util');

module.exports = function(data) {
  log.info('digesting');
  log.info(util.inspect(data, null, false));

  
};
