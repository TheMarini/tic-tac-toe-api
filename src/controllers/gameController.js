'use strict';

const database = require('../database');
const uuid = require('uuid/v4');

module.exports = {
	async create () {
		// Generate an UUID. If already exists, generate again
		for (var id = uuid(); await this.retrieve(id); uuid());

		return database.write({
			id,
			player: this.randomPlayer(),
		});
	},

	retrieve (id) {
		return database.read().then(games => {
			if (id) {
				return games.find( game => game.id === id );
			} else {
				return games;
			}
		})
	},

	randomPlayer () {
		return Math.round(Math.random()) ? 'X' : 'O';
	}
}
