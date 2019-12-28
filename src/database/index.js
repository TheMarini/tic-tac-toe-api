const jsonfile = require('jsonfile');

const file = `${__dirname}/database.json`;

module.exports = {
	retrieve (id) {
		try {
			return jsonfile.readFile(file)
				.then(rows => {
					if (id) {
						return rows.find( row => row.id === id );
					} else {
						return rows;
					}
				})
		} catch (e) {
			console.error(e);
		}
	},

	async create (row) {
		try {
			let rows = await this.retrieve();
			rows.push(row);
			this.overwriteFile(rows);
			return row;
		} catch (e) {
			console.error(e);
		}
	},

	async update (newRow) {
		let rows = await this.retrieve();
		rows[rows.findIndex( row => row.id === newRow.id )] = newRow;
		this.overwriteFile(rows);
		return newRow;
	},

	overwriteFile (json) {
		try {
			return jsonfile.writeFile(file, json, { spaces: 2 });
		} catch (e) {
			console.error(e);
		}
	},
}
