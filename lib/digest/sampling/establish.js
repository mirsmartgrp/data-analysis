'use strict';

var stats = require("stats-lite");
var _ = require('lodash');

/*
 * Establishes a common sampling rate from the statistics given.
 * @param data the statistics array
 * @result common sampling rate
 */
module.exports = function(data) {
  var mean = [], median = [], mode = [], variance = [], stdev = [];

  for (var sensor in data) {
    if (!data.hasOwnProperty(sensor))
      continue;

    mean.push(data[sensor].mean);
    median.push(data[sensor].median);
    mode.push(data[sensor].mode);
    variance.push(data[sensor].variance);
    stdev.push(data[sensor].stdev);
  }

  return {
    mean: stats.mean(mean),
    median: stats.median(median),
    mode: stats.mode(mode),
    variance: stats.variance(variance),
    stdev: stats.stdev(stdev)
  };
};
