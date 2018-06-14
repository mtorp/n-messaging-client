'use strict';

const path = require('path');
const BowerResolvePlugin = require('bower-resolve-webpack-plugin');

module.exports = {
	entry: './demos/src/demo.js',
	output: {
		path: path.resolve(__dirname, '../public'),
		filename: 'main.js'
	},
	resolve: {
		plugins: [new BowerResolvePlugin()],
		modules: ['node_modules', 'bower_components'],
		descriptionFiles: ['bower.json', 'package.json'],
		mainFields: ['browser', 'main']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
			//	include: path.join(__dirname, '../'),
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['env']
				}
			}
		]
	},
	mode: 'development',
	devtool: false
};
