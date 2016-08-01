define(['require', 'helper/util'], function(require) {
    var util = require('helper/util');

    var drawEigenvalueSet = function(
        size,
        eigenvalueSet,
        canvasWidth,
        canvasHeight,
        ctx,
        canvasData
    ){
        // the eigenvalueSet should come in the form,
        //    [[alpha_1, [ -- eigenvalues -- ], ], [alpha_2, [ -- eigenvalues -- ], ], ... ]
        var data = canvasData.data;

        for (j=0; j < size; j++) {
            var jCanvas = Math.floor(j * canvasHeight / size);
            var canvasStart = jCanvas * canvasWidth;
            var alpha = eigenvalueSet[j][0];
            var eigSet = eigenvalueSet[j][1];

            for (i = 0; i < size; i++) {
                var ind = 4 * (eigenvalueToCanvasPoint(alpha, eigSet[i], canvasWidth) + canvasStart);

                data[ind] = 255;
                data[ind + 1] = 0;
                data[ind + 2] = 0;
                data[ind + 3] = 1.0;
            }
        }
        return data
    };

    var eigenvalueToCanvasPoint = function (a, e, canvasWidth) {
        // Eigenvalues in the Hofstadter Butterfly lie in [-4, 4]
        return Math.floor(canvasWidth * (e + 4.0) / 8.0 + a);
    };

    return {
        'drawEigenvalueSet': drawEigenvalueSet
    }
});