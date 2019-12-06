const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');
const reviewOperator = require('../operators/reviews.operator');
const userOperator = require('../operators/users.operator');

// song
router.get('/song', songOperator.getAllSongsForUser);
router.get('/song/:id', songOperator.getSongByID);

// review
router.get('/review/:id', reviewOperator.getReviewBySongID);
router.get('/review', reviewOperator.getTopReviews);

// user
router.post('/user/login', userOperator.loginUser);
router.post('/user/signup', userOperator.signupUser);

module.exports = router;