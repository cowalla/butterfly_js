require(['helper/util', 'helper/display'], function(util, display) {
        var eigenvalueSet = [];
        var size = 10;

        for(var i=0.0; i<size; i++){
            var a = i / 10.0;
            var matrix = util.constructMatrix(0, a, size);
            eigenvalueSet.push(util.calculateEigenvalues(matrix, a))
        }

        var canvas = document.getElementById('display-canvas');
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var ctx = canvas.getContext("2d");
        var canvasData = ctx.createImageData(canvasWidth, canvasHeight);

        var createButterfly = function(){
            var data = display.drawEigenvalueSet(
                size,
                eigenvalueSet,
                canvasWidth,
                canvasHeight,
                ctx,
                canvasData
            );

            canvasData.data = data;
            ctx.putImageData(canvasData, 0, 0);
        };


        var createButterflyBtn = document.getElementById('createButterfly');
        createButterflyBtn.addEventListener('click', createButterfly);
    }
);

