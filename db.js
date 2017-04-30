// is the environment variable, NODE_ENV, set to PRODUCTION?
if (process.env.NODE_ENV === 'PRODUCTION') {
 	// if we're in PRODUCTION mode, then read the configration from a file
 	// use blocking file io to do this...
 	var fs = require('fs');
 	var path = require('path');
 	var fn = path.join(__dirname, 'config.json');
 	var data = fs.readFileSync(fn);

 	// our configuration file will be in json, so parse it and set the
 	// conenction string appropriately!
 	var conf = JSON.parse(data);
 	var dbconf = conf.dbconf;
 }
 else {
 	// if we're not in PRODUCTION mode, then use
 	dbconf = 'mongodb://localhost/haa322';
 }

const mongoose = require('mongoose');

//games
var Game = new mongoose.Schema({
  playerOneName: String,
  playerTwoName: String,
  winner: String
})

//users
var User = new mongoose.Schema({
  username: {type: String, unique: true},
  password: String,
  currentGames: [],
  wins: Number,
  losses: Number
});

// registering models
mongoose.model('User', User);
mongoose.model('Game', Game);

// mongoose.connect('mongodb://localhost/test');
console.log("connecting to " + dbconf);
mongoose.connect(dbconf);
