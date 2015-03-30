'use strict';

var util = require('util');
var _ = require('lodash');
var log = require('../log');
var sampling = require('./sampling');

module.exports = function(data) {
  log.info('Digesting data.');

  // determine sampling statistics
  var stat = sampling.statistics(data);

  // filtered data and stats
  var fdata = _.pick(data, ['accelerometer', 'gyroscope']);
  var fstat = _.pick(stat, ['accelerometer', 'gyroscope']);

  // establish common sampling rate
  var frate = sampling.establish(fstat);

  log.info(util.inspect(fstat, { showHidden: true, depth: null }));
  log.info(util.inspect(frate, { showHidden: true, depth: null }));
};
