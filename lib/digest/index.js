'use strict';

var util = require('util');
var log = require('../log');
var digestSsampling = require('./sampling');

module.exports = function(data) {
  log.info('Digesting data.');

  for (var sensor in data) {
    if (!data.hasOwnProperty(sensor))
      continue;

    var sensorData = data[sensor];

    var sampling = digestSsampling(sensorData);

    log.info(util.inspect(sampling, { showHidden: true, depth: null }));
  }
};
