const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');

// song
router.get('/song', songOperator.getAllSongs);
router.get('/song/:id', songOperator.getSongByID);
router.put('/song/:id', songOperator.updateSongDetailsByID);
router.put('/song/hide/:id', songOperator.hideSong);
router.put('/song/unhide/:id', songOperator.unhideSong);

module.exports = router;