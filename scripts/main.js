require(['helper/util'], function(util) {
        var a = document.getElementById('abc123');
        console.log(util);
        var matrix = util.constructMatrix(0, .3, 10);
        a.innerHTML = matrix;
    }
);