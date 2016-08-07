require(['helper/util', 'helper/display'], function(util, display) {
        var canvas = document.getElementById('display-canvas');
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var ctx = canvas.getContext("2d");

        var createButterfly = function(){
            var eigenvalueSet = [];
            var sz = sizeSlider.value;
            var size = parseFloat(sz);

            for(var i=0.0; i<size; i++){
                var a = i / sz;
                var _matrix = util.constructMatrixWithJsFeat(a, size);
                eigenvalueSet.push(util.calculateEigenvaluesWithJsFeat(_matrix, a))
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
        var updateSizeSliderValue = function () {
            document.getElementById('size-value').innerHTML = document.getElementById('size').value;
            createButterfly()
        };
        sizeSlider.addEventListener('change', updateSizeSliderValue);
        updateSizeSliderValue();
    }
);