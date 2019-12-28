'use strict';

const database = require('../database');
const uuid = require('uuid/v4');

module.exports = {
	async create () {
		// Generate an UUID. If already exists, generate again
		for (var id = uuid(); await this.retrieve(id); uuid());

		return database.create({
			id,
			playerTurn: this.randomPlayer(),
			positions: Array(3).fill(Array(3).fill())
		});
	},

	retrieve (id) {
		return database.retrieve(id);
	},

	randomPlayer () {
		return Math.round(Math.random()) ? 'X' : 'O';
	},
	
	async movement (move) {
		let game = await this.retrieve(move.id);
		
		console.log("move", move.position);
		
		if (game) {
			if (this.isPlayerTurn(game, move.player)) {
				if (this.isPositionEmpty(game, move.position.x, move.position.y)) {
					game.positions[move.position.x][move.position.y] = move.player;
					game.playerTurn = this.switchPlayer(move.player);
					database.update(game);
				} else {
					throw { status: 400, message: `Posição já ocupada por ${game.positions[move.position.x][move.position.y]}` };
				}
			} else {
				throw { status: 400, message: "Não é turno do jogador" };
			}
		} else {
			throw { status: 404, message: "Partida não encontrada" };
		}
	},
	
	isPlayerTurn (game, player) {
		return game.playerTurn == player;
	},
	
	isPositionEmpty (game, x, y) {
		return game.positions[x][y] == null;
	},
	
	switchPlayer (player) {
		return player == 'X' ? 'O' : 'X';
	},
}
