var express = require('express')
var path = require('path');
var mongoose = require('mongoose');
var db = require('./db');
let bodyParser = require('body-parser');
let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local');
let expressValidator = require('express-validator');

// Creating express app
var app = express()

//-------------------- Middleware---------------

// Static file serving
app.use(express.static(path.join(__dirname,'css')));

// Homepage with login
app.get('/', redirectAuthenticated, function(req,res) {
  res.render('index', {});
});

function redirectAuthenticated(req,res,next) {
  if(req.isAuthenticated()) {
    res.redirect('/user');
  }
  else {
    return next();
  }
}
// Static pathing for app
app.use(express.static(path.join(__dirname,'build')));



// Setting up view engine: Handlebars
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

// Using body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Setup the express session to validate user
const sessionOptions = {
	secret: 'secret',
	resave: true,
	saveUninitialized: true
};
app.use(session(sessionOptions));

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Validator Initialization
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// global variables
app.use(function(req,res,next) {
  res.locals.user = req.user || null;
  next();
})

// -------------------- Routing ---------------------

// Routing for
var index = require('./routes/index');
var users = require('./routes/users');
app.use('/', index);
app.use('/users', users);

// ---------------------- Starting Server -----------------

app.listen(3000, function () {
  console.log('Example app listening on port 8080!')
})
