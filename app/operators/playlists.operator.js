const Playlists = require('../modules/playlists.module');

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

exports.getPlaylistSearch = function(req, res) {
    Playlists.find({ $or: [{ username: req.body.username }, { isPublic: 1 }] }).find({ title: { "$regex": req.body.title, "$options": "i" } })
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