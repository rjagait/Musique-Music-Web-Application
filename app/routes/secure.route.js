const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');
const reviewOperator = require('../operators/reviews.operator');
const userOperator = require('../operators/users.operator');
const playlistOperator = require('../operators/playlists.operator');
const checkAuth = require('../middleware/checkauth');

// song
router.get('/song', checkAuth.checkauthUser, songOperator.getAllSongsForUser);
router.get('/song/search/:str', checkAuth.checkauthUser, songOperator.searchSongByAnyAttribute);
router.post('/song', checkAuth.checkauthUser, songOperator.addNewSong);
// router.delete('/song/:id', checkAuth.checkauthUser, songOperator.deleteSong);
// router.put('/song/:id', checkAuth.checkauthUser, songOperator.updateSongDetailsByID);

// review
router.post('/review', checkAuth.checkauthUser, reviewOperator.addNewReview);

// playlist
router.get('/playlist/byid/:id', checkAuth.checkauthUser, playlistOperator.getPlaylistByID);
router.get('/playlist/byusername/:username', checkAuth.checkauthUser, playlistOperator.getPlaylistByUsername);
router.get('/playlist/byonlyusername/:username', checkAuth.checkauthUser, playlistOperator.getPlaylistByOnlyUsername);
router.get('/playlist/search/:user/:str', checkAuth.checkauthUser, playlistOperator.getPlaylistSearch);
router.put('/playlist/addsong', checkAuth.checkauthUser, playlistOperator.addSongToPlaylist);
router.put('/playlist/removesong', checkAuth.checkauthUser, playlistOperator.removeSongFromPlaylist);
router.put('/playlist/updatedetails/:id', checkAuth.checkauthUser, playlistOperator.updatePlaylistDetailsByID);
router.post('/playlist', checkAuth.checkauthUser, playlistOperator.addNewPlaylist);

module.exports = router;