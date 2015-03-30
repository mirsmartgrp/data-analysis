'use strict';

var stats = require("stats-lite");
var log = require('../log');

var filterTime = function(data) {
    var result = [];

    for (var i = 0; i < data.length; i++) {
      if (undefined !== data[i].time)
        result.push(data[i].time);
    }

    return result;
};

var calculateInterval = function(time) {
    var result = [];

    if (time.length >= 2) {
      for (var i = 1; i < time.length; i++)
        result.push(time[i] - time[i-1]);
    } else {
      result.push(0.0);
    }

    return result;
};

/*
 * Analyzes the sampling rate of a given sensor data subset.
 * @param data array containing sensory data with time property
 * @return object with results
 */
var digestSampling = function(data) {
  var time = filterTime(data);
  var interval = calculateInterval(time);

  var result = {
    mean: stats.mean(interval),
    median: stats.median(interval),
    mode: stats.mode(interval),
    variance: stats.variance(interval),
    stdev: stats.stdev(interval),
    percentiles: []
  };

  for (var i = 1; i < 10; i++) {
    var val = stats.percentile(interval, (0.1*i).toFixed(1));
    result.percentiles.push({percentile: 10*i, value: val});
  }

  return result;
};

module.exports = digestSampling;
