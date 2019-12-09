const Reviews = require('../modules/reviews.module');

/**
 * Add a new review by a user/manager
 */
exports.addNewReview = function(req, res) {
    const review = new Reviews({
        songid: req.body.songid,
        userid: req.body.userid,
        review: req.body.review,
        rating: req.body.rating
    });
    review
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
 * Get reviews for a given song
 */
exports.getReviewBySongID = function(req, res) {
    const id = req.params.id;
    Reviews.find({ songid: id })
        .populate('userid')
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
 * Get the top reviews for a song
 */
exports.getTopReviews = function(req, res) {
    Reviews
        .find()
        .sort('-rating')
        .limit(2)
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