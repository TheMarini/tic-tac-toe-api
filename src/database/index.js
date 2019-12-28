const jsonfile = require('jsonfile');

const file = `${__dirname}/database.json`;

exports.read = () => {
	try {
		return jsonfile.readFile(file);
	} catch (e) {
		console.error(e);
	}
};
