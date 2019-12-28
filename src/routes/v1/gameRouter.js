'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./../../controllers/gameController.js');

// Create
router.post('/', async (req, res) => {
	try {
		res.status(200).send(await controller.create());
	} catch (e) {
		res.status(e.status).send(e.message);
	}
});

module.exports = router;
