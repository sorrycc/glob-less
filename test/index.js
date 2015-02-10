'use strict';

var gless = require('..');
var join = require('path').join;
var rm = require('rimraf').sync;
var exists = require('fs').existsSync;

describe('glob-less', function() {

  it('normal', function(done) {

    var base = join(__dirname, 'fixtures/normal');
    rm(join(base, 'b.css'));
    rm(join(base, 'a/a.css'));

    gless('**/*.less', base, function() {
      exists(join(base, 'b.css')).should.be.true;
      exists(join(base, 'a/a.css')).should.be.true;
      rm(join(base, 'b.css'));
      rm(join(base, 'a/a.css'));
      done();
    });

  });

});
