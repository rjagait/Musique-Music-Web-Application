const Playlists = require('../modules/playlists.module');

/**
 * Adding a new playlist with madatory title
 */
exports.addNewPlaylist = function(req, res) {
    const playlist = new Playlists({
        username: req.body.username,
        playlistArray: req.body.playlistArray,
        title: req.body.title,
        description: req.body.description,
        isPublic: req.body.isPublic
    });
    playlist
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'POST REQUEST handling',
                createdDetail: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

/**
 * Return all playlists for manager login
 */
exports.getAllPlaylists = function(req, res) {
    Playlists
        .find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0) {
                res.status(200).json(docs);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

/**
 * Get all playlists for auth user login
 */
exports.getPlaylistByUsername = function(req, res) {
    const id = req.params.username;
    Playlists.find({ $or: [{ username: id }, { isPublic: 1 }] })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

/**
 * Search for playlist by name
 */
exports.getPlaylistSearch = function(req, res) {
    Playlists.find({ $or: [{ username: req.body.username }, { isPublic: 1 }] }).find({ title: { "$regex": req.body.title, "$options": "ix" } })
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid entry found' })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

/**
 * Add songs to array in playlist
 */
exports.addSongToPlaylist = function(req, res) {
    Playlists.update({ _id: req.body.id }, { $push: { playlistArray: req.body.songid } }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

/**
 * Remove songs from array in playlist
 */
exports.removeSongFromPlaylist = function(req, res) {
    Playlists.update({ _id: req.body.id }, { $pull: { playlistArray: req.body.songid } }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

/**
 * Update title/description of the playlist
 */
exports.updatePlaylistDetailsByID = function(req, res) {
    const id = req.params.id;
    Playlists.update({ _id: id }, { $set: { title: req.body.title, description: req.body.description } }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

/**
 * Delete a playlist by user/manager
 */
exports.deletePlaylist = function(req, res) {
    const id = req.params.id;
    Playlists
        .remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};