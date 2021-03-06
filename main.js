var express = require('express');
var util = require('util');
var passport = require('passport');
var auth = require('./authentication.js');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/auth');
var UserModel = require('./models/user.js');
var User = mongoose.model('User');
var path = require('path');
var app = express();
var console = require('console');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.configure(function(){
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({secret:"my cust0m 5E5510N k3y"}));
app.use(passport.initialize());
app.use(passport.session());
});
module.exports = express;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/', function(req, res){
  res.render('index', { title: 'Welcome to PassportJS Example' });
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/success',
                                     failureRedirect: '/failure' }));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { successRedirect: '/success',
                                     failureRedirect: '/failure' }));

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', 
  passport.authenticate('github', { successRedirect: '/success',
                                     failureRedirect: '/failure' }));

app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/callback', 
  passport.authenticate('google', { successRedirect: '/success',
                                     failureRedirect: '/failure' }));

app.get('/auth/basic', function(req, res){
    res.render('loginform');
});
app.post('/auth/basic', passport.authenticate('local', { successRedirect: '/api/me',
            failureRedirect: '/auth/basic' }));

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/success', function(req, res){
  res.contentType('json');
  res.send({result:'success', details:req.user});
});

app.get('/api/me',
  function(req, res) {
    if(req.user!=null){
      res.json(req.user);
  }else{
    res.json("{'result':'Unable to find the authenticated user'}");
  }
  });
console.warn('Starting app at port 8080');
app.listen(8080);