var math = require('mathjs');
var numeric = require('numeric');

function constructMatrix(g, a, size) {
  var _matrix = numeric.identity(size);
  var matrixNorm = 2.0 * math.pi * a;
  var minusComputed = math.exp(g);
  var plusComputed = math.exp(-g);

  for (var i = 0; i < size; i++) {
    _matrix[i][i] = 2.0 * math.cos(matrixNorm * i);
    var indices = constructIndices(i, size);
    _matrix[i][indices[0]] = minusComputed;
    _matrix[i][indices[1]] = plusComputed;
  }

  return _matrix;
}

function constructIndices(index, size) {
  var indices;
  if (index === 0) {
    indices = [size - 1, 1];
  } else if (index === size - 1) {
    indices = [index, 0];
  } else {
    indices = [index - 1, index + 1];
  }
  return indices;
}

function calculateEigenvalues(matrix) {
  return numeric.eig(matrix);
}

module.exports = {
  constructMatrix: constructMatrix,
  calculateEigenvalues: calculateEigenvalues
};
