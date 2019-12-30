const express = require('express');
const router = express.Router();

// Check API status
router.get('/', (req, res) => {
  res.status(200).send('API online :)');
});

router.use('/game', require('./gameRouter'));

module.exports = router;
