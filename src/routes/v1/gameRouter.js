'use strict';

const express = require('express');
const router = express.Router();

const controller = require('./../../controllers/gameController.js');

// Create
router.post('/', (req, res) => {
	try {
		res.send(controller.create());
	} catch (e) {
		res.status(e.status).send(e.message);
	}
});

module.exports = router;
