const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');
const reviewOperator = require('../operators/reviews.operator');
const userOperator = require('../operators/users.operator');
const playlistOperator = require('../operators/playlists.operator');

// song
router.post('/song', songOperator.addNewSong);
router.delete('/song/:id', songOperator.deleteSong);
router.put('/song/:id', songOperator.updateSongDetailsByID);

// review
router.post('/review/:id', reviewOperator.addNewReview);

// playlist
router.post('/playlist', playlistOperator.addNewPlaylist);
router.get('/playlist/byusername/:username', playlistOperator.getPlaylistByUsername);
router.get('/playlist/search', playlistOperator.getPlaylistSearch);
router.put('/playlist/addsong', playlistOperator.addSongToPlaylist);
router.put('/playlist/removesong', playlistOperator.removeSongFromPlaylist);
router.put('/playlist/updatedetails/:id', playlistOperator.updatePlaylistDetailsByID);

// user
router.post('/user', userOperator.addNewUser);
router.get('/user', userOperator.getAllUsers); //dummy
router.get('/user/byid/:id', userOperator.getUserByID); //dummy
router.get('/user/byusername/:id', userOperator.getUserByUsername); //dummy

module.exports = router;