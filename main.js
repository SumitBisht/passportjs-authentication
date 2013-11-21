var express = require('express')
, util = require('util')
, passport = require('passport')
, TwitterStrategy = require('passport-twitter').Strategy
, config = require('./private-settings.js')
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

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    process.nextTick(function(){
    	return done(null, profile);
    });
      
    // });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.post('/login', passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login' }));

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/success',
                                     failureRedirect: '/failure' }));
app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.get('/api/me', 
  passport.authenticate('token', { session: false }),
  function(req, res) {
  	if(req.user!=null){
    	res.json(req.user);
	}else{
		res.json("{'result':'Unable to find the authenticated user'}");
	}
  });
app.listen(8080);