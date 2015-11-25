var util = require('./util');
var d3 = require('d3');
var ractive = require('ractive');
var plotter = require('./plotter');

module.exports = function main() {
  var butterflyWrapper = global.document.getElementById('butterfly-wrapper');
  var matrix = util.makeButterfly(0, 10, 10);
  butterflyWrapper.innerHTML = matrix;

  var getElement = function(id){
    return global.document.getElementById(id)
  };

  var butterflyWrapper = getElement('butterfly-wrapper'),
    sizeSlider = getElement('size-slider'),
    slicesSlider = getElement('slices-slider');

  var callButterfly = function(sizeSlider, slicesSlider){
    var size = sizeSlider.value,
      slices = slicesSlider.value;

    var data = util.makeButterfly(0, size, slices);

    console.log(data);
  };

  var updateValues = function(event){
    event.stopPropagation();
    event.preventDefault();

    callButterfly(
      parseInt(getElement('size-slider')),
      parseInt(getElement('slices-slider'))
    )
  };

  sizeSlider.oninput = updateValues;
  slicesSlider.oninput = updateValues;
};
