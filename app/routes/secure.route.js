const express = require('express');
const router = express.Router();
const songOperator = require('../operators/songs.operator');
const reviewOperator = require('../operators/reviews.operator');
const userOperator = require('../operators/users.operator');
const playlistOperator = require('../operators/playlists.operator');
const checkAuth = require('../middleware/checkauth');

// song
// router.post('/song', checkAuth.checkauthUser, songOperator.addNewSong);
// router.get('/song', checkAuth.checkauthUser, songOperator.getAllSongsForUser);
// router.delete('/song/:id', checkAuth.checkauthUser, songOperator.deleteSong);
// router.put('/song/:id', checkAuth.checkauthUser, songOperator.updateSongDetailsByID);
// router.get('/song/search/:str', checkAuth.checkauthUser, songOperator.searchSongByAnyAttribute);

// review
// router.post('/review/:id', checkAuth.checkauthUser, reviewOperator.addNewReview);

// playlist
// router.post('/playlist', checkAuth.checkauthUser, playlistOperator.addNewPlaylist);
// router.get('/playlist/byusername/:username', checkAuth.checkauthUser, playlistOperator.getPlaylistByUsername);
// router.get('/playlist/search', checkAuth.checkauthUser, playlistOperator.getPlaylistSearch);
// router.put('/playlist/addsong', checkAuth.checkauthUser, playlistOperator.addSongToPlaylist);
// router.put('/playlist/removesong', checkAuth.checkauthUser, playlistOperator.removeSongFromPlaylist);
// router.put('/playlist/updatedetails/:id', checkAuth.checkauthUser, playlistOperator.updatePlaylistDetailsByID);

// user
// router.post('/user/verify', checkAuth.checkauthUser, userOperator.verifyUser);
// router.post('/user', checkAuth.checkauthUser, userOperator.addNewUser);
// router.get('/user', checkAuth.checkauthUser, userOperator.getAllUsers);
// router.get('/user/byid/:id', checkAuth.checkauthUser, userOperator.getUserByID);
// router.get('/user/byusername/:id', checkAuth.checkauthUser, userOperator.getUserByUsername);

module.exports = router;