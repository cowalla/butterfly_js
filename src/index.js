var util = require('./util');

module.exports = function main() {
  var a = global.document.getElementById('abc123');
  var matrix = util.constructMatrix(0, 0.3, 10);
  a.innerHTML = matrix;
};
