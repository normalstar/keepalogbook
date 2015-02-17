'use strict';

module.exports = function(options) {
  options = options || {};
  var express = require('express');
  var path = require('path');
  var fs = require('fs');
  var app = express();
  var html = fs.readFileSync(path.resolve(__dirname, './app/simple.html'), 'utf-8');

  function renderApplication(path, scriptUrl, styleUrl, commonsUrl, callback) {
    callback(null, html.replace('SCRIPT_URL', scriptUrl).replace('STYLE_URL', styleUrl));
  }

  var stats = require('./build/stats.json');
  var publicPath = stats.publicPath;
  var SCRIPT_URL = publicPath + [].concat(stats.assetsByChunkName.main)[0];

  var STYLE_URL = options.build ? publicPath + [].concat(stats.assetsByChunkName.main)[1] : '';
  var COMMONS_URL = '';

  if (options.build) {
    fs.readdirSync(path.resolve(__dirname, './build/public')).forEach(function(filename) {
      if (stats.assetsByChunkName.main.indexOf(filename) > -1) {
        return;
      }
      fs.unlink(path.resolve(__dirname, './build/public') + '/' + filename, function(err) {
        if (err) { throw err; }
        console.log('Deleted ' + filename);
      });
    });

    renderApplication('', SCRIPT_URL, STYLE_URL, COMMONS_URL, function(err, html) {
      fs.writeFile(path.resolve(__dirname, './build/index.html'), html, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Built index');
          fs.unlink(path.resolve(__dirname, './build/stats.json'), function (err) {
            if (err) { throw err; }
            console.log('Deleted stats.json');
          });
        }
      });
    });

  } else {

    app.get('/*', function(req, res) {
      renderApplication(req.path, SCRIPT_URL, STYLE_URL, COMMONS_URL, function(err, html) {
        res.contentType = 'text/html; charset=utf8';
        res.end(html);
      });
    });

    var port = +(process.env.PORT || options.defaultPort || 8080);
    app.listen(port, function() {
      console.log('Server listening on port ' + port);
    });

  }
};
