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
				number: 1,
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
					game.turn.number++;
					game.turn.player = this.switchPlayer(move.player);
					database.update(game);

					if (game.turn.number >= 5) {
						if (this.isPlayerWinner(move.player, game.positions)) {
							return {
								msg: "Partida finalizada",
								winner: move.player
							}
						}
					}
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

	isPlayerWinner (player, positions) {
		let count = 0;

		// - Horizontal -
		for (let row of positions) {
			for (let column of row) {
				if (column == player)
					count++;
				else
					break;
			}

			if (count === 3)
				return true;
			else
				count = 0;
		}

		// Reset
		count = 0;

		// - Vertical -
		for (let column = 0; column < positions.length; column++) {
			for (let row = 0; row < positions.length; row++) {
				if (positions[row][column] == player)
					count++
				else
					break;
			}

			if (count === 3)
				return true;
			else
				count = 0;
		}

		// Reset
		count = 0;

		// - Diagonal -
		for (let diagonal = 0; diagonal < positions.length; diagonal++) {
			if (positions[diagonal][diagonal] == player)
				count++
			else
				break;
		}

		if (count === 3)
			return true;
		else
			count = 0;

		for (let diagonal = 0; diagonal < positions.length; diagonal++) {
			let flipped = this.flipPositionHorizontally(diagonal, diagonal)
			if (positions[flipped[0]][flipped[1]] == player)
				count++
			else
				break;
		}

		return count === 3;
	}
}
