require(['helper/util'], function(util) {
        var util = require('helper/util');

        var a = document.getElementById('abc123');
        var matrix = util.constructMatrix(0, .3, 10);
        a.innerHTML = matrix;
    }
);