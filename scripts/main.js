require(['helper/util', 'helper/display', 'packages/algebra'], function(util, display) {
        var eigenvalueSet = [];
        var sz = 20.0;
        var size = parseFloat(sz);

        var canvas = document.getElementById('display-canvas');
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var ctx = canvas.getContext("2d");

        var createButterfly = function(){
            for(var i=0.0; i<size; i++){
                var a = i / sz;
                var matrix = util.constructMatrix(0, a, size);
                var b = util.iterativeMethod(matrix);
                eigenvalueSet.push(util.calculateEigenvalues(matrix, a))
            }


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