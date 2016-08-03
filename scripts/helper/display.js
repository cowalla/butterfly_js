define(['require', 'helper/util'], function(require) {
    var util = require('helper/util');

    var drawEigenvalueSet = function(
        size,
        eigenvalueSet,
        canvasWidth,
        canvasHeight,
        ctx
    ){
        // the eigenvalueSet should come in the form,
        //    [[alpha_1, [ -- eigenvalues -- ], ], [alpha_2, [ -- eigenvalues -- ], ], ... ]
        var canvasData = ctx.createImageData(canvasWidth, canvasHeight);

        for (var j=0; j < size; j++) {
            var jCanvas = Math.floor(j * canvasHeight / size);
            var canvasStart = jCanvas * canvasWidth;
            var alpha = eigenvalueSet[j][0];
            var eigSet = eigenvalueSet[j][1];

            for (var i = 0; i < size; i++) {
                var ind = 4 * (eigenvalueToCanvasPoint(alpha, eigSet[i], canvasWidth) + canvasStart);

                canvasData.data[ind] = 255;
                canvasData.data[ind + 1] = 0;
                canvasData.data[ind + 2] = 0;
                canvasData.data[ind + 3] = 255;
            }
        }

        ctx.putImageData(canvasData, 0, 0);

        return canvasData
    };

    var eigenvalueToCanvasPoint = function (a, e, canvasWidth) {
        // Eigenvalues in the Hofstadter Butterfly lie in [-4, 4]
        return Math.floor(canvasWidth * (e + 4.0) / 8.0);
    };

    return {
        'drawEigenvalueSet': drawEigenvalueSet
    }
});