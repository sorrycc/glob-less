'use strict';

var globule = require('globule');
var less = require('less');
var type = require('component-type');
var debug = require('debug')('glob-less:index');
var readFile = require('fs').readFileSync;
var writeFile = require('fs').writeFileSync;
var join = require('path').join;

module.exports = function(files, cwd, callback) {
  cwd = cwd || process.cwd();
  if (type(files) !== 'array') {
    files = [files];
  }
  debug('files glob', files);
  files.push({srcBase:cwd});
  files = globule.find.apply(globule, files);
  debug('files found', files);

  var opts = {
    compress: false,
    paths: []
  };

  var total = files.length;
  var count = 0;

  files.forEach(function(f) {
    debug('render less', f);
    var content = readFile(join(cwd, f), 'utf-8');
    less.render(content, opts)
      .then(function(result) {
        var filepath = join(cwd, f.replace(/\.less$/, '.css'));
        debug('render less', f, '\n', result.css);
        writeFile(filepath, result.css);

        count = count + 1;
        if (count === total) {
          callback && callback();
        }
      });
  });
};
