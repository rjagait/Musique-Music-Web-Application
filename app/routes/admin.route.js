const express = require('express');
const router = express.Router();
const userOperator = require('../operators/users.operator');
const playlistOperator = require('../operators/playlists.operator');
const songOperator = require('../operators/songs.operator');
const checkAuth = require('../middleware/checkauth');

// song
router.get('/song', checkAuth.checkauthAdmin, songOperator.getAllSongs);
router.get('/song/:id', checkAuth.checkauthAdmin, songOperator.getSongByID);
router.put('/song/hide/:id', checkAuth.checkauthAdmin, songOperator.hideSong);
router.put('/song/unhide/:id', checkAuth.checkauthAdmin, songOperator.unhideSong);
router.put('/song/update/:id', checkAuth.checkauthAdmin, songOperator.updateSongDetailsByID);
router.post('/song', checkAuth.checkauthAdmin, songOperator.addNewSong);
router.delete('/song/:id', checkAuth.checkauthAdmin, songOperator.deleteSong);

// playlist
router.get('/playlist', checkAuth.checkauthAdmin, playlistOperator.getAllPlaylists);
router.get('/playlist/:id', checkAuth.checkauthAdmin, playlistOperator.getPlaylistByID);
router.put('/playlist/updatedetails/:id', checkAuth.checkauthAdmin, playlistOperator.updatePlaylistDetailsByID);
router.post('/playlist', checkAuth.checkauthAdmin, playlistOperator.addNewPlaylistAdmin);
router.delete('/playlist/:id', checkAuth.checkauthAdmin, playlistOperator.deletePlaylist);

// user
router.get('/user', checkAuth.checkauthAdmin, userOperator.getAllUsers);
router.put('/user/setmanager/:username', checkAuth.checkauthAdmin, userOperator.setAsManager);
router.put('/user/unsetmanager/:username', checkAuth.checkauthAdmin, userOperator.unsetAsManager);
router.put('/user/deactivate/:username', checkAuth.checkauthAdmin, userOperator.deactivateUser);
router.put('/user/activate/:username', checkAuth.checkauthAdmin, userOperator.activateUser);

module.exports = router;