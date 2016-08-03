// methods I made then discarded


var polynomialForContinuantOfBandedMatrix = function(matrix){
    // https://en.wikipedia.org/wiki/Tridiagonal_matrix#Determinant
    // f(1) = a(1)
    // f(n) = a(n) * f(n-1) - c(n-1) * b(n-1) * f(n-2)
    // Sadly, I would need to find the zeroes of a polynomial of order n to use this.

    var size = matrix.length;
    var lastIndex = size - 1;

    // boundary condition
    if(size === 0){
        return new algebra.Expression(1);
    }

    if(size === 1){
        return _entryMinusLambda(matrix[0][0])
    }

    var matrixMinus = _reduceMatrixSize(matrix);
    var matrixMinusMinus = _reduceMatrixSize(matrixMinus);
    var an = _entryMinusLambda(matrix[lastIndex][lastIndex]);
    var cnminus = _entryMinusLambda(matrix[lastIndex - 1][lastIndex]);
    var bnminus = _entryMinusLambda(matrix[lastIndex][lastIndex - 1]);
    var fnminus = polynomialForContinuantOfBandedMatrix(matrixMinus);
    var fnminusminus = polynomialForContinuantOfBandedMatrix(matrixMinusMinus);

    return an.multiply(fnminus).subtract(
        cnminus.multiply(bnminus).multiply(fnminusminus)
    )
};

var iterativeMethod = function(matrix) {
    // Sadly, I would need to find the zeroes of a polynomial of order n to use this.

    var size = matrix.length;
    var _matrix = matrix.slice();

    // boundary conditions
    if(size === 0){
        return new algebra.Expression(1)
    }

    if(size === 1){
        return _entryMinusLambda(_matrix[0][0])
    }

    var detMinusMinus = _entryMinusLambda(_matrix[0][0]).multiply(_entryMinusLambda(_matrix[1][1])).subtract(
        new algebra.Expression(_matrix[0][1]*_matrix[1][0])
    );

    if(size === 2){
        return detMinusMinus
    }

    var detMinus = _entryMinusLambda(_matrix[2][2]).multiply(detMinusMinus).subtract(
        new algebra.Expression(_matrix[1][2]*_matrix[2][1]).multiply(_entryMinusLambda(_matrix[0][0]))
    );

    if(size === 3){
        return detMinus
    }

    var det;

    for(var j=4; j<size-1; j++){
        var bminus = _matrix[j-1][j],
            cminus = _matrix[j][j-1];

        det = _entryMinusLambda(_matrix[j][j]).multiply(detMinus).subtract(
            new algebra.Expression(bminus * cminus).multiply(detMinusMinus)
        );

        detMinusMinus = detMinus;
        detMinus = det;
    }

    return det
};

var _entryMinusLambda = function(entry){
    var _lambda = algebra.parse('-l');

    return _lambda.add(entry);
};

var _toeplitzEigenvalue = function(n, k, a, b, c){
    return a + 2 * sqrt(b * c) * math.cos( math.pi * k / (n + 1) )
};

var eigenvaluesForToeplitz = function(size, a, b, c){
    var eigenvalues = [];

    for(var i=0; i<size; i++){
        eigenvalues.push(
            _toeplitzEigenvalue(size, i, a, b, c)
        )
    }

    return eigenvalues;
};

var _reduceMatrixSize = function(matrix){
    // take off end array
    var _matrix = matrix.slice(0, -1);

    // take off last element of each array
    for(var i=0; i<_matrix.length; i++){
        _matrix[i] = _matrix[i].slice(0, -1)
    }

    return _matrix
};

var constructIndices = function(index, size){
    if(index===0){
        return [size - 1, 1]
    } else if(index === size-1){
        return [index, 0]
    } else {
        return [index - 1, index + 1]
    }
};

var calculateEigenvalues = function(matrix, a){
    //return [a, numeric.eig(matrix).lambda.x];
    return [a, numeric.svd(matrix).S]
};

var constructMatrix = function (g, a, size){
    var _matrix = numeric.identity(size),
        matrixNorm = 2.0 * math.pi * a,
        minusComputed = math.exp(g),
        plusComputed = math.exp(-g);

    for(var i=0;i<size;i++){
        _matrix[i][i] = 2.0*math.cos(matrixNorm*i);
        var indices = constructIndices(i, size);
        _matrix[i][indices[0]] = minusComputed;
        _matrix[i][indices[1]] = plusComputed;
    }

    return _matrix
};