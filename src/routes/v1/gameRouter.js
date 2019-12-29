'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./../../controllers/gameController.js');

// Create
router.post('/', async (req, res) => {
	try {
		let game = await controller.create();
		res.status(200).send({ id: game.id, firstPlayer: game.playerTurn });
	} catch (e) {
		res.status(e.status).send( {msg: e.message} );
	}
});

router.post('/:id/movement', async (req, res) => {
	try {
		res.status(200).send(await controller.movement(req.body));
	} catch (e) {
		res.status(e.status).send( {msg: e.message} );
	}
});

module.exports = router;
