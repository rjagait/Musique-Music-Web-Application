const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');
const reviewOperator = require('../operators/reviews.operator');
const userOperator = require('../operators/users.operator');

// song
router.get('/song/topn', songOperator.getTopnSongs);
router.get('/song/:id', songOperator.getSongByID);
router.get('/song/search/:str', songOperator.searchSongByAnyAttribute);

// review
router.get('/review/:id', reviewOperator.getReviewBySongID);

// user
router.post('/user/login', userOperator.loginUser);
router.post('/user/signup', userOperator.signupUser);
router.get('/user/verify/:token', userOperator.verifyUser);

module.exports = router;