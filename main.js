var express = require('express')
, util = require('util')
, passport = require('passport')
, TwitterStrategy = require('passport-twitter').Strategy
, GithubStrategy = require('passport-github').Strategy
, config = require('./private-settings.js')
, mongoose = require('mongoose')
, db = mongoose.connect('mongodb://localhost:27017/auth')
, UserModel = require('./models/user.js')
, User = mongoose.model('User')
, app = express();

app.configure(function(){
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({secret:"my cust0m 5E5510N k3y"}));
app.use(passport.initialize());
app.use(passport.session());
});


passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({id:profile.id}, function(err, user) {
      if (!err && user != null) {
        var objectId = mongoose.Types.ObjectId
        User.update({"_id":user["_id"]}, {$set: {modified: new Date()}}).exec();
         }else{
         	var user_data = new User({
         		id: profile.id,
         		provider: profile.provider,
         		displayName: profile.displayName,
         		name: profile.username,
         		emails:{value:profile.email},
         		created: Date.now(),
         		modified: Date.now(),
         		oauthtoken: token
         	});
         	user_data.save(function(error){
         		if(error)
         			console.log('Error while saving user: '+error);
         		else
         			console.log('User Saved successfully:'+profile.id);
         	});
         }
    	return done(null, user);
    });
  }
));

passport.use(new GithubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL,
    userAgent: 'http://127.0.0.1:8080'
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({id:profile.id}, function(err, user) {
      if (!err && user != null) {
        var objectId = mongoose.Types.ObjectId
        User.update({"_id":user["_id"]}, {$set: {modified: new Date()}}).exec();
         }else{
         	var user_data = new User({
         		id: profile.id,
         		provider: profile.provider,
         		displayName: profile.name,
         		name: profile.login,
         		emails:{type:"email", value:profile.email},
         		created: Date.now(),
         		modified: Date.now(),
         		oauthtoken: token
         	});
         	user_data.save(function(error){
         		if(error)
         			console.log('Error while saving user: '+error);
         		else
         			console.log('User Saved successfully:'+profile.id);
         	});
         }
    	return done(null, user);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// app.post('/login', passport.authenticate('local', { successRedirect: '/',
//             failureRedirect: '/login' }));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/success',
                                     failureRedirect: '/failure' }));

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', 
  passport.authenticate('github', { successRedirect: '/success',
                                     failureRedirect: '/failure' }));
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.get('/success', function(req, res){
	res.contentType('json');
	res.send({result:'success', details:req.user});
});

app.get('/api/me', 
  // passport.authenticate('twitter', { session: false }),
  function(req, res) {
  	if(req.user!=null){
    	res.json(req.user);
	}else{
		res.json("{'result':'Unable to find the authenticated user'}");
	}
  });
app.listen(8080);