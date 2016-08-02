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

        var createButterfly = function(){
            var newImageData = display.drawEigenvalueSet(
                size,
                eigenvalueSet,
                canvasWidth,
                canvasHeight,
                ctx
            );

            ctx.putImageData(newImageData, 0, 0);
        };


        var createButterflyBtn = document.getElementById('createButterfly');
        createButterflyBtn.addEventListener('click', createButterfly);
    }
);


//for(var i=0; i<100000; i++){if(newImageData.data[i]!=0){console.log(i)}}