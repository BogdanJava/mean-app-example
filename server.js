let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
let morgan = require('morgan');
let mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
let passport = require('passport');
let social = require('./app/passport/passport')(app, passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan(`dev`));
app.use(express.static(__dirname + "/public"));
app.use('/api', appRoutes);

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (err) {
        console.log(`Not connected to db: ${err}`);
    } else {
        console.log(`Successfully connected to MongoDB`);
    }
});


app.get("*", function (req, res) {
   res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, function () {
    console.log(`Running the server on port ${port}`);
});

