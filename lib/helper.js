'use strict';

var Handlebars = require('handlebars');

exports.register = function() {
  Handlebars.registerHelper('table', function(data) {
    var cols = [], result;

    data.forEach(function(row) {
      for (var col in row) {
        if (!row.hasOwnProperty(col))
          continue;
        if (cols.indexOf(col) === -1)
          cols.push(col);
      }
    });
    cols.sort();

    result = '<table class="pure-table pure-table-horizontal"><thead><tr>';
    cols.forEach(function(col) {
        result += '<td>'+col+'</td>';
    });
    result += '</tr></thead><tbody>';
    data.forEach(function(row) {
      result += '<tr>';
      cols.forEach(function(col) {
        result += '<td>'+JSON.stringify(row[col])+'</td>';
      });
      result += '</tr>';
    });
    result += '</tbody></table>';

    return new Handlebars.SafeString(result);
  });
};
