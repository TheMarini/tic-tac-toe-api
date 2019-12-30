
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('API online :)');
});

router.use('/game', require('./gameRouter'));

module.exports = router;
