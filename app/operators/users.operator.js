const Users = require('../modules/users.module');
const argon2 = require('argon2');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');
const sgMail = require('@sendgrid/mail');
const db = require('../../config/database');

/**
 * Add a new user to the auth users list, from google login requests
 * google login
 */
exports.googleLoginUser = async function(req, res) {
    // Look for user by same username in db
    const userFound = await Users.findOne({ username: req.params.username });

    // if no user found, create one as GoogleLogin
    if (userFound == null || userFound.length < 1) {
        const users = new Users({
            username: req.params.username,
            password: "NA",
            isGoogleLoginID: true,
        });
        users.save();
    }

    // Get details of that user, create a jwt token for future requests
    setTimeout(async function() {
        const user = await Users.findOne({ username: req.params.username });
        console.log(user);
        if (user.isDeactivated) {
            return res.status(401).json({
                message: "Account Deactivated, please contact site admin"
            })
        }
        const token = jwt.sign({
                username: user.username,
                userId: user._id
            },
            auth.jwtkey, {
                expiresIn: "1h"
            });
        return res.status(200).json({
            message: 'Authentication Success',
            token: token,
            username: user.username,
            userid: user._id,
            isManager: user.isManager,
        })
    }, 500);
};

/**
 * Add a new user to the auth users list
 * login
 */
exports.loginUser = async function(req, res) {
    const user = await Users.findOne({ username: req.body.username });
    if (user == null || user.length < 1) {
        return res.status(401).json({
            message: "User doesn't exist"
        });
    }
    isCorrectPassword = await argon2.verify(user.password, req.body.password);
    if (user.isGoogleLoginID) {
        return res.status(401).json({
            message: "Please login as Google login instead."
        })
    } else if (!isCorrectPassword) {
        return res.status(401).json({
            message: "Incorrect Password, please try again"
        })
    } else if (user.isDeactivated) {
        return res.status(401).json({
            message: "Account Deactivated, please contact site admin"
        })
    } else if (!user.isActive) {
        return res.status(401).json({
            message: "Email not verified"
        })
    } else {
        const token = jwt.sign({
                username: user.username,
                userId: user._id
            },
            auth.jwtkey, {
                expiresIn: "1h"
            });
        return res.status(200).json({
            message: 'Authentication Success',
            token: token,
            username: user.username,
            userid: user._id,
            isManager: user.isManager,
        })
    }
};

/**
 * Add a new user to the auth users list
 * Signup user
 */
exports.signupUser = async function(req, res) {
    const pass = await argon2.hash(req.body.password);
    Users.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Username Exists"
                });
            } else {
                const token = randomstring.generate(7);
                const users = new Users({
                    username: req.body.username,
                    password: pass,
                    secretToken: token
                });
                users
                    .save()
                    .then(result => {
                        console.log(result);

                        SENDGRID_API_KEY = db.sendgrid_key;
                        verifurl = db.url + "/open/user/verify/" + token;
                        // rjagait: change it to req.body.username
                        emailto = req.body.username;

                        sgMail.setApiKey(SENDGRID_API_KEY);
                        const msg = {
                            to: emailto,
                            from: 'no-reply@musique.com',
                            subject: 'Verification Email',
                            text: 'Text',
                            html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \n' + verifurl,
                        };
                        sgMail.send(msg);

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
 * Will verification email to the user
 * Login user
 */
exports.resendVerifEmail = function(req, res) {
    Users.findOne({ username: req.params.username })
        .exec()
        .then(user => {
            console.log("Will resend email");
            console.log(user);
            SENDGRID_API_KEY = db.sendgrid_key;
            verifurl = db.url + "/open/user/verify/" + user.secretToken;
            // rjagait: change it to req.body.username
            emailto = req.body.username;

            sgMail.setApiKey(SENDGRID_API_KEY);
            const msg = {
                to: emailto,
                from: 'no-reply@musique.com',
                subject: 'Verification Email',
                text: 'Text',
                html: 'Hello,\n\n' + 'Please verify your account by clicking the link: \n' + verifurl,
            };
            sgMail.send(msg);

            res.status(201).json({
                message: 'Verif email resent',
                userDetail: user
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
 * Verify user and mark as active
 * TODO: add email verification
 */
exports.verifyUser = async function(req, res) {
    const user = await Users.findOne({ secretToken: req.params.token });
    if (user == null || user.length < 1) {
        return res.status(401).json({
            message: "Invalid token!"
        });
    }
    Users.update({ secretToken: req.params.token }, { $set: { isActive: true } }).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Email verified successfully.'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

/**
 * Add a new user to the auth users list
 * Signup
 */
exports.addNewUser = async function(req, res) {
    const pass = await argon2.hash(req.body.password);
    const users = new Users({
        username: req.body.username,
        password: pass
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

/**
 * Get the list of all users, for manager role
 */
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

/**
 * Search user by the userID
 */
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

/**
 * Search user by the complete username
 */
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

/**
 * Mark a user as manager, by manager role
 */
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

/**
 * Unmark a user as manager, by manager role
 */
exports.unsetAsManager = function(req, res) {
    const id = req.params.username;
    Users.update({ username: id }, { $set: { isManager: "0" } }).exec()
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
 * Deactivate an existing user, by manager role
 */
exports.deactivateUser = function(req, res) {
    const id = req.params.username;
    Users.update({ username: id }, { $set: { isDeactivated: "1" } }).exec()
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
 * Activate a deactivated user, by manager role
 */
exports.activateUser = function(req, res) {
    const id = req.params.username;
    Users.update({ username: id }, { $set: { isDeactivated: "0" } }).exec()
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