const Playlists = require('../modules/playlists.module');

exports.addNewPlaylist = function(req, res) {
    const playlist = new Playlists({
        username: req.body.username,
        playlistArray: req.body.playlistArray,
        title: req.body.title,
        description: req.body.description
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

// exports.getAllSongs = function(req, res) {
//     Songs
//         .find()
//         .exec()
//         .then(docs => {
//             console.log(docs);
//             if (docs.length > 0) {
//                 res.status(200).json(docs);
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         });
// };

// exports.getSongByID = function(req, res) {
//     const id = req.params.id;
//     Songs.findById(id)
//         .exec()
//         .then(doc => {
//             console.log(doc);
//             if (doc) {
//                 res.status(200).json(doc);
//             } else {
//                 res.status(404).json({ message: 'No valid entry found' })
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// };

// exports.updateSongDetailsByID = function(req, res) {
//     const id = req.params.id;
//     Songs.update({ _id: id }, { $set: { genre: req.body.genre, title: req.body.title, artist: req.body.artist, album: req.body.album, track: req.body.track } }).exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         });
// };

// exports.hideSong = function(req, res) {
//     const id = req.params.id;
//     Songs.update({ _id: id }, { $set: { isHidden: "1" } }).exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         });
// };

// exports.unhideSong = function(req, res) {
//     const id = req.params.id;
//     Songs.update({ _id: id }, { $set: { isHidden: "0" } }).exec()
//         .then(result => {
//             console.log(result);
//             res.status(200).json(result);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         });
// };

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