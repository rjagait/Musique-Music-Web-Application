const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');
const reviewOperator = require('../operators/reviews.operator');

// song
router.post('/song', songOperator.addNewSong);
router.delete('/song/:id', songOperator.deleteSong);

// review
router.put('/review/:id', reviewOperator.addNewReview);

module.exports = router;