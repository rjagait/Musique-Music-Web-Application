const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');
const reviewOperator = require('../operators/reviews.operator');

// song
router.get('/song', songOperator.getAllSongs);
router.get('/song/:id', songOperator.getSongByID);
router.put('/song/:id', songOperator.updateSongDetailsByID);
router.put('/song/hide/:id', songOperator.hideSong);
router.put('/song/unhide/:id', songOperator.unhideSong);

// review
router.get('/review/:id', reviewOperator.getReviewBySongID);
router.get('/review', reviewOperator.getTopReviews); //not used, dummy

module.exports = router;