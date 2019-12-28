const jsonfile = require('jsonfile');

const file = `${__dirname}/database.json`;

module.exports = {
	read () {
		try {
			return jsonfile.readFile(file);
		} catch (e) {
			console.error(e);
		}
	},

	async write (obj) {
		try {
			let database = await this.read();
			database.push(obj);
			this.overwrite(database);
			return obj;
		} catch (e) {
			console.error(e);
		}
	},

	overwrite (json) {
		try {
			return jsonfile.writeFile(file, json, { spaces: 2 });
		} catch (e) {
			console.error(e);
		}
	},
}
