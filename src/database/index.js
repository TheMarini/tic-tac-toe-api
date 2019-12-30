const path = require('path');
const fs = require('fs');

const jsonfile = require('jsonfile');

const file = path.resolve(__dirname, 'database.json');

// Create file if it doesn't exist
try {
  fs.statSync(file);
} catch (e) {
	fs.writeFileSync(file, '[]');
}

module.exports = {
  retrieve(id) {
    return jsonfile.readFile(file)
      .then((rows) => {
        if (id) {
          return rows.find((row) => row.id === id);
        }
        return rows;
      });
  },

  async create(row) {
    const rows = await this.retrieve();
    rows.push(row);
    this.overwriteFile(rows);
    return row;
  },

  async update(newRow) {
    const rows = await this.retrieve();
    rows[rows.findIndex((row) => row.id === newRow.id)] = newRow;
    this.overwriteFile(rows);
    return newRow;
  },

  overwriteFile(json) {
    return jsonfile.writeFile(file, json, { spaces: 2 });
  },
};
