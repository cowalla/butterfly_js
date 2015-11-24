var jsdom = require('jsdom');
var helpers = require(__BASE + '/test/helpers');
var index = require(__BASE + '/src/index');

describe('main', function() {
  var window;

  before(function(done) {
    jsdom.env('<div id="abc123"></div>', function(err, res) {
      if (err) { return done(err); }

      window = res;
      global.document = window.document;
      index();
      done();
    });
  });

  it('generates a matrix', function() {
    var innerHtml = document.getElementById('abc123').innerHTML;
    helpers.expect(innerHtml).to.contain('0');
    helpers.expect(innerHtml).to.contain(',');
  });
});
