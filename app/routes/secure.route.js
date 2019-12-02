const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');

//song
router.post('/song', songOperator.addNewSong);
router.delete('/song/:id', songOperator.deleteSong);

module.exports = router;