const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');
const reviewOperator = require('../operators/reviews.operator');
const userOperator = require('../operators/users.operator');

// song
router.get('/song/topn', songOperator.getTopnSongs);
router.get('/song/byid/:id', songOperator.getSongByID);
router.get('/song/search/:str', songOperator.searchSongByAnyAttribute);

// review
router.get('/review/:id', reviewOperator.getReviewBySongID);

// user
router.get('/user/verify/:token', userOperator.verifyUser);
router.get('/user/resendverify/:username', userOperator.resendVerifEmail);
router.post('/user/login', userOperator.loginUser);
router.post('/user/googlelogin/:username', userOperator.googleLoginUser);
router.post('/user/signup', userOperator.signupUser);

module.exports = router;