var express =  require('express');
let mongoose = require('mongoose');
let path = require('path');
let db = require(path.join(__dirname, '/../db'));
let session = require('express-session');
let bcrypt = require('bcrypt');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

// Initialize router
var router = express.Router();

// Create DB model
let users = mongoose.model('User');
let games = mongoose.model('Game');

router.post('/register', function(req,res) {
  let username = req.body.username;
  let password = req.body.password;

  users.findOne({username:username}, function(err,name,count) {
    if(name !== null) {
      // res.render('error', {Type:"Username Error", Message:"Username already exists"});
      res.send("Username taken");
    }
    else {
      bcrypt.hash(password, 10, function(err, hash) {
        if(err) {
          console.log(err);
          res.send("An error has occured, please check the server output.")
        }
        else {
          let newUser = new users({
            username:username,
            password:hash,
            wins:0,
            losses:0
          }).save(function(err,user,count){
            if(err) {
              console.log(err);
              res.send("An error has occured, please check the server output.");
            }
            else {
              console.log(user);
              req.session.regenerate(function(err) {
                if(err) {
                  console.log(err);
                  res.send("An error has occured, please check the server output.");
                }
                else {
                  req.session.username = user.username;
                  console.log("No errors! Registration successful.")
                  res.redirect('/user');
                }
              });
            }
          });
        }
      });
    }
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    users.findOne({username:username}, function(err,account,count) {
      if(err) {
        console.log(err);
        res.send("An error has occured, please check the server output.");
      }
      else {
        if(account !== null) {
          const saltRounds = 10;
          bcrypt.compare(password, account.password, (err, passwordMatch) => {
            if(!passwordMatch) {
              console.log("Passwords did not match");
              return done(null, false, {message:"Passwords did not match"});
            }
            else {
              console.log("Login Success");
              return done(null, account);
            }
          });
        }
        else {
          console.log("User not found");
          return done(null, false, {message: "User not found"});
        }
      }
    });
  }));

router.post('/login',
  passport.authenticate('local', {successRedirect:'/user', failureRedirect:'/', failureFlash:false}),
  function(req,res) {
    res.redirect('/');
});

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

router.post('/createGame', function(req,res) {
  let username = req.body.username;

  users.findOne({username:username}, function(err,user,count) {
    if(user === null) {
      console.log("No user by that name exists");
      res.render('user', {user:req.user, userNotFound:true});
    }
    else {
      if(user.username === req.user.username) {
        res.render('user', {user:req.user, sameUser:true});
      }
      else {
        let newGame = new games({
          playerOneName: req.user.username,
          playerTwoName: user.username
        }).save(function(err,game,count) {
          if(err) {
            console.log(err);
            res.send("An error has occured, please check the server output");
          }
          else {
            let id = game.id;
            users.findByIdAndUpdate(user.id, {$push: {currentGames:id}}, function(err,user) {
              if(err) {
                console.log(err);
              }
            });
            users.findByIdAndUpdate(req.user.id, {$push: {currentGames:id}}, function(err,user) {
              if(err) {
                console.log(err);
              }
            });

            res.redirect('/user');

          }
        })
      }
    }
  });

});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  users.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
