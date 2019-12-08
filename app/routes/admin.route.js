const express = require('express');
const router = express.Router();
const userOperator = require('../operators/users.operator');
const playlistOperator = require('../operators/playlists.operator');
const songOperator = require('../operators/songs.operator');
const checkAuth = require('../middleware/checkauth');

// song
router.get('/song', checkAuth.checkauthAdmin, songOperator.getAllSongs);
// router.post('/song', checkAuth.checkauthAdmin, songOperator.addNewSong);
// router.put('/song/:id', checkAuth.checkauthAdmin, songOperator.updateSongDetailsByID);
// router.delete('/song/:id', checkAuth.checkauthAdmin, songOperator.deleteSong);
// router.put('/song/hide/:id', checkAuth.checkauthAdmin, songOperator.hideSong);
// router.put('/song/unhide/:id', checkAuth.checkauthAdmin, songOperator.unhideSong);

// playlist
// router.post('/playlist', checkAuth.checkauthAdmin, playlistOperator.addNewPlaylist);
// router.get('/playlist', checkAuth.checkauthAdmin, playlistOperator.getAllPlaylists);
// router.delete('/playlist/:id', checkAuth.checkauthAdmin, playlistOperator.deletePlaylist);
// router.put('/playlist/updatedetails/:id', checkAuth.checkauthAdmin, playlistOperator.updatePlaylistDetailsByID);

// user
router.get('/user', checkAuth.checkauthAdmin, userOperator.getAllUsers);
router.put('/user/setmanager/:username', checkAuth.checkauthAdmin, userOperator.setAsManager);
router.put('/user/unsetmanager/:username', checkAuth.checkauthAdmin, userOperator.unsetAsManager);
router.put('/user/deactivate/:username', checkAuth.checkauthAdmin, userOperator.deactivateUser);
router.put('/user/activate/:username', checkAuth.checkauthAdmin, userOperator.activateUser);

module.exports = router;