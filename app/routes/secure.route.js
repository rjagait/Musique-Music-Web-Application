const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');
const reviewOperator = require('../operators/reviews.operator');
const userOperator = require('../operators/users.operator');
const playlistOperator = require('../operators/playlists.operator');

// song
router.post('/song', songOperator.addNewSong);
router.delete('/song/:id', songOperator.deleteSong);

// review
router.put('/review/:id', reviewOperator.addNewReview);

// playlist
router.put('/playlist', playlistOperator.addNewPlaylist);

// user
router.put('/user', userOperator.addNewUser);
router.get('/user', userOperator.getAllUsers); //dummy
router.get('/user/byid/:id', userOperator.getUserByID); //dummy
router.get('/user/byusername/:id', userOperator.getUserByUsername); //dummy

module.exports = router;