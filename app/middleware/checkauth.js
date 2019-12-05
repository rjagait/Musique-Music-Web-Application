const jwt = require('jsonwebtoken');
const auth = require('../../config/auth');
const Users = require('../modules/users.module');

/**
 * Autheticate user
 */
exports.checkauthUser = async function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decoded = jwt.verify(token, auth.jwtkey);
        req.userData = decoded;
    } catch (error) {
        return res.status(401).json({
            message: "Authetication Failed"
        })
    }
    next();
};

/**
 * Autheticate Admin
 */
exports.checkauthAdmin = async function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userheader = req.headers.username;
        const user = await Users.findOne({ username: userheader });
        if (!user.isManager) {
            return res.status(401).json({
                message: "Access Denied, account not admin/manager"
            })
        }
        const decoded = jwt.verify(token, auth.jwtkey);
        req.userData = decoded;
    } catch (error) {
        return res.status(401).json({
            message: "Authetication Failed"
        })
    }
    next();
};