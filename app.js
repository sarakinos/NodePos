// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');


var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./app/config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./app/config/passport')(passport); // pass passport for configuration

//setup static routers
app.use('/bower_components',express.static(__dirname+'/bower_components'));
app.use('/public',express.static(__dirname+'/public'));
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ 
	secret: 'bampisisnice' , 
	cookie: { 
        secure: false,
        maxAge: 3600000 //60 minutes cookie
      }
    })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/restFull/productService.js')(app);
require('./app/restFull/userService.js')(app);
require('./app/restFull/categoryService.js')(app);
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);


//Custom functions

