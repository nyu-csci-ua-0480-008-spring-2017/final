var express =  require('express');
let mongoose = require('mongoose');
let path = require('path');
let db = require(path.join(__dirname, '/../db'));
let session = require('express-session');
let bcrypt = require('bcrypt');
let passport = require('passport');
let LocalStrategy = require('passport-local');

var router = express.Router();

let users = mongoose.model('User');
let games = mongoose.model('Game');

router.get('/user', ensureAuthenticated, function(req,res) {
  res.render('user', {user:req.user});
});

router.get('/test', function(req,res) {
  res.render('test');
});

router.get('/game', function (req, res) {
  res.sendFile(path.join(__dirname, '/../build/index.html'));
});

router.get('/api/game/:id', function(req,res) {
  games.findById(req.params.id, function(err,game) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(game);
    }
  })
})

router.post('/api/game', function(req,res) {
  let id = req.body.id;
  let winner = req.body.winner;

  games.findByIdAndUpdate(id, {winner:winner}, function(err, game) {
    if(err) {
      res.send(err);
    }
    else {
      let player1 = game.playerOneName;
      let player2 = game.playerTwoName;

      if(winner === "X") {
        console.log("Updating for X win")
        users.findOneAndUpdate({username:player1}, {$inc: {wins:1}}, function(err,user) {
          if(err) {
            res.send(err);
          }
          else {
            console.log("Updated " + user.username);
          }
        });
        users.findOneAndUpdate({username:player2}, {$inc: {losses:1}}, function(err,user) {
          if(err) {
            res.send(err);
          }
          else {
            console.log("updated " + user.username);
          }
        });
      }
      if(winner === "O") {
        console.log("Updating for Y win")
        users.findOneAndUpdate({username:player1}, {$inc: {losses:1}}, function(err,user) {
          if(err) {
            res.send(err);
          }
        });
        users.findOneAndUpdate({username:player2}, {$inc: {wins:1}}, function(err,user) {
          if(err) {
            res.send(err);
          }
        });
      }
    }
  });




})

function ensureAuthenticated(req,res,next) {
  if(req.isAuthenticated()) {
    return next();
  }
  else{
    res.redirect('/');
  }
}

module.exports = router;
