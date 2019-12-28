'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./../../controllers/gameController.js');

// Create
router.post('/', async (req, res) => {
	try {
		let game = await controller.create();
		res.status(200).send({ id: game.id, firstPlayer: game.player });
	} catch (e) {
		res.status(e.status).send(e.message);
	}
});
	} catch (e) {
		res.status(e.status).send(e.message);
	}
});

module.exports = router;
