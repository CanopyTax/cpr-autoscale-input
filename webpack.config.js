var path = require('path');
var webpack = require('webpack');
var ngminPlugin = require('ngmin-webpack-plugin');

var version = require('./package.json').version;
var name = require('./package.json').name;

module.exports = {
	entry: "./src/cpr-autoscale-input.js",
	output: {
		path: './build',
		filename: name + '.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			loader: "style-loader!css-loader!autoprefixer"
		}, {
			test: /\.html$/,
			loader: "html-loader"
		}]
	},
	externals: {
		"react": "React",
    "jquery": "$"
	},
	plugins: [
		new webpack.BannerPlugin("\
" + name + "\n\
author: Leah Bentley\n\
copyright: 2016\n\
license: MIT\n\
version: " + version)
	]
};
