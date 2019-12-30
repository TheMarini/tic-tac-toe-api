const path = require('path');

module.exports = {
	mode: "production",
	target: 'node',
	node: {
	  __dirname: false,
	  __filename: false
	},
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
