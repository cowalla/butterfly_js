define(['require', 'packages/math', 'packages/numeric'], function(require){
    // numeric defined passively through 'require'
    require('packages/numeric');
    var math = require('packages/math');

    var constructMatrix = function (g, a, size){
        var _matrix = numeric.identity(size),
            matrixNorm = 2.0 * math.pi * a,
            minusComputed = math.exp(g),
            plusComputed = math.exp(-g);

        for(i=0;i<size;i++){
            _matrix[i][i] = 2.0*math.cos(matrixNorm*i);
            var indices = constructIndices(i, size);
            _matrix[i][indices[0]] = minusComputed;
            _matrix[i][indices[1]] = plusComputed;
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
        return [a, numeric.eig(matrix).lambda.x];
    };

    return {
        'calculateEigenvalues': calculateEigenvalues,
        'constructMatrix': constructMatrix
    };
});