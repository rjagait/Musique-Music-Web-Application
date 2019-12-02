const express = require('express');
const router = express.Router();
const userOperator = require('../operators/users.operator');
const playlistOperator = require('../operators/playlists.operator');

// playlist
router.put('/playlist', playlistOperator.addNewPlaylist);
router.delete('/playlist/:id', playlistOperator.deletePlaylist);

// user
router.post('/user/setmanager/:username', userOperator.setAsManager);
router.post('/user/deactivate/:username', userOperator.deactivateUser);
router.post('/user/activate/:username', userOperator.activateUser);

module.exports = router;