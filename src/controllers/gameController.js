'use strict';

const database = require('../database');
const uuid = require('uuid/v4');

module.exports = {
	async create () {
		// Generate an UUID. If already exists, generate again
		for (var id = uuid(); await this.retrieve(id); uuid());

		return database.create({
			id,
			turn: {
				number: 0,
				player: this.randomPlayer()
			},
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
		
		if (game) {
			let flippedPosition = this.flipPositionHorizontally(move.position.y, move.position.x)
			let row = flippedPosition[0];
			let column = flippedPosition[1];			
			
			if (this.isPlayerTurn(game, move.player)) {
				if (this.isPositionEmpty(game, row, column)) {
					game.positions[row][column] = move.player;
					game.turn.player = this.switchPlayer(move.player);
					database.update(game);
				} else {
					throw { status: 400, message: `Posição já ocupada por ${game.positions[row][column]}` };
				}
			} else {
				throw { status: 400, message: "Não é turno do jogador" };
			}
		} else {
			throw { status: 404, message: "Partida não encontrada" };
		}
	},
	
	isPlayerTurn (game, player) {
		return game.turn.player == player;
	},
	
	isPositionEmpty (game, row, column) {
		return game.positions[row][column] == null;
	},
	
	flipPositionHorizontally (row, column) {
		let	dictionary = [
			[ [2,0], [2,1], [2,2] ],
			[ null, null, null ],
			[ [0,0], [0,1], [0,2] ]
		];
		
		return dictionary[row][column] || [row, column];
	},

	switchPlayer (player) {
		return player == 'X' ? 'O' : 'X';
	},
}
