'use strict';

var stats = require("stats-lite");

function filterTime(data) {
    var result = [];

    for (var i = 0; i < data.length; i++) {
      if (undefined !== data[i].time)
        result.push(data[i].time);
    }

    return result;
};

function calculateInterval(time) {
    var result = [];

    if (time.length >= 2) {
      for (var i = 1; i < time.length; i++)
        result.push(time[i] - time[i-1]);
    } else {
      result.push(0.0);
    }

    return result;
};

function digestSampling(data) {
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

/*
 * Determine sampling statistics per sensor.
 * @param data sensory data
 * @result sampling object
 */
module.exports = function(data) {
  var result = {};

  for (var sensor in data) {
    if (!data.hasOwnProperty(sensor))
      continue;
    result[sensor] = digestSampling(data[sensor]);
  }

  return result;
};
