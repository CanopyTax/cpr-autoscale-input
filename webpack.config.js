const path = require('path');
var webpack = require('webpack');

var version = require('./package.json').version;
var name = require('./package.json').name;

module.exports = {
	entry: "./src/cpr-autoscale-input.js",
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: name + '.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			}
		]
	},
	externals: {
		"react": "React"
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
