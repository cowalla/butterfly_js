define(['require', 'packages/math', 'packages/jsfeat'], function(require){
    // numeric defined passively through 'require'
    require('packages/jsfeat');
    var math = require('packages/math');

    var constructMatrixWithJsFeat = function (a, size) {
        var data_type = jsfeat.F32C1_t,
            _matrix = new jsfeat.matrix_t(size, size, data_type),
            matrixNorm = 2.0 * math.pi * a;

        _matrix.data[size - 1] = 1.0;
        _matrix.data[0] = 2.0;
        _matrix.data[1] = 1.0;

        _matrix.data[size*(size - 1)] = 1.0;
        _matrix.data[(size*size) - 1] = 2.0 * math.cos(matrixNorm*size);
        _matrix.data[(size*size) - 2] = 1.0;

        for (var i=1; i < size; i++){
            _matrix.data[size*i + i] = 2.0*math.cos(matrixNorm*i);
            _matrix.data[size*i + i - 1] = 1.0;
            _matrix.data[size*i + i + 1] = 1.0;
        }

        return _matrix;
    };

    var calculateEigenvaluesWithJsFeat = function(matrixT, a){
        // faster than using numeric

        var data_type = jsfeat.F32C1_t;
        var _eigenvalues = new jsfeat.matrix_t(matrixT.cols, 1, data_type);
        jsfeat.linalg.eigenVV(matrixT, null, _eigenvalues);

        return [a, _eigenvalues.data.slice()]
    };

    return {
        'calculateEigenvaluesWithJsFeat': calculateEigenvaluesWithJsFeat,
        'constructMatrixWithJsFeat': constructMatrixWithJsFeat
    };
});