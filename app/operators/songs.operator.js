const Songs = require('../modules/songs.module');
const Reviews = require('../modules/reviews.module');

/**
 * Get top n(10) songs for unauthenticated user
 */
exports.getTopnSongs = async function(req, res) {
    var songs = await Songs.find();
    for (var i = 0; i < songs.length; i++) {
        try {
            var reviews = await Reviews.find({ songid: songs[i]._id });
            res2 = await Songs.update({ _id: songs[i]._id }, { $set: { totalReviews: reviews.length } });

        } catch (err) {
            res2 = await Songs.update({ _id: songs[i]._id }, { $set: { totalReviews: 0 } });
        }
    }

    Songs
        .find()
        .sort('-totalReviews').limit(10)
        .populate({ path: 'Reviews' })
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
 * Get all songs for manager
 */
exports.getAllSongs = function(req, res) {
    Songs
        .find()
        .populate({ path: 'Reviews' })
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
 * Get all songs for a user
 */
exports.getAllSongsForUser = function(req, res) {
    Songs
        .find({ isHidden: 0 })
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
 * Search song by attribute, 
 * 1. case-insensitive
 * 2. Ignore whitespace and symbols
 */
exports.searchSongByAnyAttribute = function(req, res) {
    const searchText = req.params.str;
    Songs
        .find({ isHidden: 0 })
        .find({
            $or: [
                { title: { $regex: searchText, $options: 'i' } },
                { artist: { $regex: searchText, $options: 'i' } },
                { album: { $regex: searchText, $options: 'i' } },
                { track: { $regex: searchText, $options: 'i' } },
                { genre: { $regex: searchText, $options: 'i' } }
            ]
        })
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
 * Add a new song by user/manager
 */
exports.addNewSong = function(req, res) {
    const songs = new Songs({
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        track: req.body.track,
        genre: req.body.genre
    });
    songs
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
 * Get song by the SongID
 */
exports.getSongByID = async function(req, res) {
    const id = req.params.id;
    var reviews = await Reviews.find({ songid: id }).sort('-_id');
    var reviewstopn = await Reviews.find({ songid: id }).sort('-_id').limit(2);

    Songs.findOne({ _id: id })
        .populate('reviews')
        .exec()
        .then(doc => {
            var totalReviews = reviews.length;
            doc.totalReviews = totalReviews;
            doc.reviews = reviewstopn;

            var sum = 0;
            for (var i = 0; i < totalReviews; i++)
                sum = sum + reviews[i].rating;
            sum = sum / totalReviews;
            doc.avgRating = sum;
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
 * Update the ID3v1 details of a song, supported by the module
 */
exports.updateSongDetailsByID = function(req, res) {
    const id = req.params.id;
    Songs.update({ _id: id }, { $set: { genre: req.body.genre, title: req.body.title, artist: req.body.artist, album: req.body.album, track: req.body.track } }).exec()
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
 * Hide a song, by manager role
 */
exports.hideSong = function(req, res) {
    const id = req.params.id;
    Songs.update({ _id: id }, { $set: { isHidden: "1" } }).exec()
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
 * Unhide a song, by manager role
 */
exports.unhideSong = function(req, res) {
    const id = req.params.id;
    Songs.update({ _id: id }, { $set: { isHidden: "0" } }).exec()
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
 * Delete a song by user/manager
 */
exports.deleteSong = function(req, res) {
    const id = req.params.id;
    Songs
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