var should = require("should");
var mongoose = require('mongoose');
var User = require("../models/user.js");
var db;

describe('User', function() {

before(function(done) {
 db = mongoose.connect('mongodb://localhost/test');
   done();
 });

 after(function(done) {
   mongoose.connection.close()
   done();
 });

 beforeEach(function(done) {
  var user = new User({
  id: 12345,
  displayName: 'testy',
    created: Date.now()
  });

  user.save(function(error) {
    if (error) console.log('error' + error.message);
    else console.log('no error');
    done();
   });
 });

 it('find a user by username', function(done) {
    User.findOne({ id: 12345, displayName: "testy" }, function(err, user) {
      user.displayName.should.eql('testy');
      user.id.should.eql(12345)
      console.log("   name: ", user.displayName)
      console.log("   oauthID: ", user.id)
      done();
    });
 });

 afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
 });

});
