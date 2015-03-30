'use strict';

var util = require('util');
var log = require('../log');
var sampling = require('./sampling');

module.exports = function(data) {
  log.info('Digesting data.');

  // determine sampling statistics
  var sstat = sampling.statistics(data);

  // establish common sampling rate
  var srate = sampling.establish(sstat);

  log.info(util.inspect(sstat, { showHidden: true, depth: null }));
  log.info(util.inspect(srate, { showHidden: true, depth: null }));
};
