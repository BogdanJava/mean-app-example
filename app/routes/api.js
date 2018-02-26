let User = require('../models/user');
let jwt = require('jsonwebtoken');
let secret = 'harrypotter';

module.exports = function (router) {
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (req.body.username == null || req.body.username == "" ||
            req.body.password == null || req.body.password == "" ||
            req.body.email == null || req.body.email == "") {
            res.json({success: false, message: `ensure username, email and password were provided`})
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({success: false, message: `such user already exists!`});
                }
                else {
                    res.json({success: true, message: `user created: ${user.username}`});
                }
            });
        }
    });

    router.post('/authenticate', function (req, res) {
        User.findOne({username: req.body.username}).select('email username password').exec((err, user) => {
            if (err) throw err;

            if (!user) {
                res.json({success: false, message: 'Could not authenticate user'});
            } else {
                let validPassword;
                if (req.body.password) validPassword = user.comparePassword(req.body.password);
                if (!validPassword) {
                    res.json({success: false, message: 'Could not authenticate password'});
                } else {
                    let token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '24h'});
                    res.json({success: true, message: 'User authenticated', token: token});
                }
            }
        })
    });

    router.use(function (req, res, next) {
        let token = req.body.token || req.body.query || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    res.json({success: false, message: 'Token invalid'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({success: false, message: 'No token provided'});
        }

    });

    router.post('/me', function (req, res) {
        res.send(req.decoded);
    });

    return router;
};