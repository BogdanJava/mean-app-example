let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
let morgan = require('morgan');
let mongoose = require('mongoose');
var User = require('./app/models/user');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan(`dev`));

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log(`Not connected to db: ${err}`);
    } else {
        console.log(`Successfully connected to MongoDB`);
    }
});

app.listen(port, function () {
    console.log(`Running the server on port ${port}`);
});

/*routes*/

app.post('/users', function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (req.body.username == null || req.body.username == "" ||
        req.body.password == null || req.body.password == "" ||
        req.body.email == null || req.body.email == "") {
        res.send(`ensure username, email and password were provided`);
    } else {
        user.save(function (err) {
            if (err) {
                res.send(`such user already exists!`);
            }
            else {
                res.send(`user created: ${user.username}`);
            }
        });
    }
});