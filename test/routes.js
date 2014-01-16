var app = require('../main');
var should = require('should');
var request = require('supertest');

describe('Routes', function(){

	var url = 'localhost:8080'
	it('should be able to access index page', function(done){
		request(url)
		.get('/')
		.expect(200, done);
	});
	it('should fail on bad routes', function(done){
		request(url)
		.get('/wrong')
		.expect(404, done);
	});
	it('should provide my information', function(done){
		request(url)
		.get('/api/me')
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
	it('should not allow to log out', function(done){
		request(url)
		.get('/logout')
		.expect(302, done);
	});
	it('should not allow authorization by default', function(done){
		request(url)
		.get('/auth/twitter')
		.expect(500, done);
	});

	it('should fail on repeated wrong authorizations', function(done){
		request(url)
		.get('/auth/facebook')
		.expect(302, done);
	});
	it('should fail even with form data', function(done){
		request(url)
		.post('/auth/basic')
		.expect(302, done);
	});
});