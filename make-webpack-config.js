'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(options) {
  options = options || {};
  var publicPath = options.build ? '/public/' : 'http://localhost:2992/_assets/';
  var excludeFromStats = [
    /node_modules[\\\/]react(-router)?[\\\/]/
  ];
  var plugins = [
    function() {
      this.plugin('done', function(stats) {
        var jsonStats = stats.toJson({
          chunkModules: true,
          exclude: excludeFromStats
        });
        jsonStats.publicPath = publicPath;
        require('fs').writeFileSync(path.join(__dirname, 'build', 'stats.json'), JSON.stringify(jsonStats));
      });
    },

    new webpack.DefinePlugin({
      __FIREBASE__: JSON.stringify(options.config.firebase),
      __DEV__: JSON.stringify(options.config.dev)
    }),

    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(ja)$/),
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
  ];

  if (options.build) {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin("[name].[chunkhash].css")
    );
  }

  var jsLoader = options.build ?
    { test: /\.js$/, loader: 'jsx-loader?harmony' } :
    { test: /\.js$/, loaders: ['react-hot-loader', 'jsx-loader?harmony'] };

  var cssLoader = options.build ?
    { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") } :
    { test: /\.css$/, loader: "style-loader!css-loader" };

  var lessLoader = options.build ?
    { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") } :
    { test: /\.less$/, loader: "style-loader!css-loader!less-loader" };

  return {
    entry: {
      main: './app/index'
    },
    output: {
      path: path.join(__dirname, 'build', 'public'),
      publicPath: publicPath,
      filename: '[name]' + (options.build ? '.[chunkhash]' : '') + '.js',
    },
    module: {
      loaders: [
        jsLoader,
        cssLoader,
        lessLoader
      ]
    },
    resolve: {
      root: path.join(__dirname, 'app'),
      modulesDirectories: ['shared', 'node_modules', 'bower_components']
    },
    plugins: plugins,
    devServer: {
      stats: {
        exclude: excludeFromStats
      }
    }
  };
};
