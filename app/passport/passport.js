let FacebookStrategy = require('passport-facebook').Strategy;
let VkStrategy = require('passport-vkontakte').Strategy;
let User = require('../models/user');
let session = require('express-session');
let jwt = require('jsonwebtoken');
let secret = 'harrypotter';

module.exports = function (app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    }));

    passport.serializeUser((user, done) => {
        token = jwt.sign({username: user.username, email: user.email}, secret, {expiresIn: '24h'});
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });

    passport.use(new VkStrategy(
        {
            clientID: "6394839", // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
            clientSecret: "3unKWAA50stDBlOAn9e6",
            callbackURL: "http://localhost:8080/auth/vkontakte/callback",
            profileFields: ['id', 'displayName', 'email']
        },
        function (accessToken, refreshToken, params, profile, done) {
            User.findOne({
                email: profile._json.email
            }).select("username password email").exec((err, user) => {
                if (err) done(err);

                if (user && user != null) {
                    done(null, user);
                } else {
                    done(err);
                }
            })
        }
    ));

    passport.use(new FacebookStrategy({
            clientID: "222679644964877",
            clientSecret: "d84622d9bf11ef90715c9cdd6818dbcf",
            callbackURL: "http://localhost:8080/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({
                email: profile._json.email
            }).select('username password email').exec((err, user) => {

                if (err) done(err);

                if (user && user != null) {
                    done(null, user);
                } else {
                    done(err);
                }
            });
        }
    ));

    app.get('/auth/vkontakte/callback', passport.authenticate(
        'vkontakte', {failureRedirect: '/vkerror'}
    ), function (req, res) {
        res.redirect('/vkontakte/' + token);
    });

    app.get('/auth/facebook/callback', passport.authenticate(
        'facebook', {failureRedirect: '/facebookerror'}
    ), function (req, res) {
        res.redirect('/facebook/' + token);
    });

    app.get('/auth/facebook', passport.authenticate(
        'facebook', {scope: 'email'}
    ));

    app.get('/auth/vkontakte', passport.authenticate(
        'vkontakte', {scope: 'email'}
    ));

    return passport;
};



