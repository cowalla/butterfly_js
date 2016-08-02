require(['helper/util', 'helper/display'], function(util, display) {
        var eigenvalueSet = [];
        var sz = 70.0;
        var size = parseFloat(sz);

        var canvas = document.getElementById('display-canvas');
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var ctx = canvas.getContext("2d");

        var createButterfly = function(){
            sz = sizeSlider.value;
            size = parseFloat(sz);

            for(var i=0.0; i<size; i++){
                var a = i / sz;
                var matrix = util.constructMatrix(0, a, size);
                eigenvalueSet.push(util.calculateEigenvalues(matrix, a))
            }

            display.drawEigenvalueSet(
                size,
                eigenvalueSet,
                canvasWidth,
                canvasHeight,
                ctx
            );
        };

        var clear = function(){
            ctx.putImageData(ctx.createImageData(canvasWidth, canvasHeight), 0, 0)
        };

        var createButterflyBtn = document.getElementById('createButterfly');
        createButterflyBtn.addEventListener('click', createButterfly);

        var clearBtn = document.getElementById('clear');
        clearBtn.addEventListener('click', clear);

        var sizeSlider = document.getElementById('size');
    }
);


//for(var i=0; i<100000; i++){if(newImageData.data[i]!=0){console.log(i)}}