const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/database');

const app = express();

//for mlab
mongoose.connect(db.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// serve files in static ' folder at root URL ' / '
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/', express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Using routes
const Open = require('./app/routes/open.route');
const Secure = require('./app/routes/secure.route');
const Admin = require('./app/routes/admin.route');

app.use('/api/open', Open);
app.use('/api/secure', Secure);
app.use('/api/admin', Admin);

app.listen(db.port); // start server

console.log('Listening on port ', db.port);