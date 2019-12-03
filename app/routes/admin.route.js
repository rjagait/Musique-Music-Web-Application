const express = require('express');
const router = express.Router();
const userOperator = require('../operators/users.operator');
const playlistOperator = require('../operators/playlists.operator');
const songOperator = require('../operators/songs.operator');

// song
router.get('/song', songOperator.getAllSongs);
router.put('/song/hide/:id', songOperator.hideSong);
router.put('/song/unhide/:id', songOperator.unhideSong);

// playlist
router.post('/playlist', playlistOperator.addNewPlaylist);
router.get('/playlist', playlistOperator.getAllPlaylists);
router.delete('/playlist/:id', playlistOperator.deletePlaylist);
router.put('/playlist/updatedetails/:id', playlistOperator.updatePlaylistDetailsByID);

// user
router.put('/user/setmanager/:username', userOperator.setAsManager);
router.put('/user/deactivate/:username', userOperator.deactivateUser);
router.put('/user/activate/:username', userOperator.activateUser);

module.exports = router;