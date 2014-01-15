var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var UserModel = require('./models/user.js');
var config =  require('./private-settings.js');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var console = require('console');
var module = require('module');

module.exports=
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username}, function(error, user){
          if(error) {
            console.log('Error occured:'+error);
            return done(error);
          }
          if(!user){
            console.log('User not found');
            return done(null, false, {message:'User not found'});
          }
          if(!user.validPassword(password)){
            console.log('Password not correct');
            return done(null, false, {message:'Password does not match'});
          }
          return done(null, user);
        });
}
));

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({id:profile.id}, function(err, user) {
      if (!err && user != null) {
        var objectId = mongoose.Types.ObjectId;
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
            if(error){
              console.log('Error while saving user: '+error);
            }
            else{
              console.log('User Saved successfully:'+profile.id);
            }
          });
         }
      return done(null, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID:config.facebook.clientID,
    clientSecret:config.facebook.clientSecret,
    callbackURL:config.facebook.callbackURL,
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({id:profile.id}, function(err, user) {
      if (!err && user != null) {
        var objectId = mongoose.Types.ObjectId;
        User.update({"_id":user["_id"]}, {$set: {modified: new Date()}}).exec();
         }else{
            var user_data = new User({
                id: profile.id,
                provider: profile.provider,
                displayName: profile.first_name+' '+profile.last_name,
                name: profile.username,
                emails:{value:profile.email},
                created: Date.now(),
                modified: Date.now(),
                oauthtoken: token
            });
            user_data.save(function(error){
                if(error){
                    console.log('Error while saving user: '+error);
                  }
                else{
                    console.log('User Saved successfully:'+profile.id);
                  }
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
    userAgent: config.github.userAgent
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({id:profile.id}, function(err, user) {
      if (!err && user != null) {
        var objectId = mongoose.Types.ObjectId;
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
            if(error){
              console.log('Error while saving user: '+error);
            }
            else{
              console.log('User Saved successfully:'+profile.id);
            }
          });
         }
      return done(null, user);
    });
  }
));
passport.use(new GoogleStrategy({
  returnURL: config.google.returnURL,
  realm: config.google.realm
  },
  function(token, tokenSecret, profile, done){
    User.findOne({id:profile.id, provider:profile.provider}, function(err, user) {
      if(!err && user != null) {
        var objectId = mongoose.Types.ObjectId;
        User.update({"_id":user["_id"]}, {$set: {modified: new Date()}}).exec();
      }else{
        var user_data = new User({
          id: profile.id,
          provider: profile.provider,
          displayName: profile.name,
          name: profile.name,
          emails:{type:"email", value:profile.email},
          created: Date.now(),
          modified: Date.now(),
          oauthtoken: token
        });
          user_data.save(function(error){
            if(error){
              console.log('Error while saving user: '+error);
            }
            else{
              console.log('User Saved successfully:'+profile.id);
            }
          });
      }
      return done(null, user);
    });
  }
));