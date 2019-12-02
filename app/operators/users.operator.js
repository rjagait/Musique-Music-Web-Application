const Users = require('../modules/users.module');

exports.addNewUser = function(req, res) {
    const users = new Users({
        username: req.body.username,
        password: req.body.password
    });
    users
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

exports.getAllUsers = function(req, res) {
    Users
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

exports.getUserByID = function(req, res) {
    const id = req.params.id;
    Users.findById(id)
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

exports.getUserByUsername = function(req, res) {
    const id = req.params.id;
    Users.find({ username: id })
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

exports.setAsManager = function(req, res) {
    const id = req.params.username;
    Users.update({ username: id }, { $set: { isManager: "1" } }).exec()
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

exports.deactivateUser = function(req, res) {
    const id = req.params.username;
    Users.update({ username: id }, { $set: { isActive: "0" } }).exec()
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

exports.activateUser = function(req, res) {
    const id = req.params.username;
    Users.update({ username: id }, { $set: { isActive: "1" } }).exec()
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