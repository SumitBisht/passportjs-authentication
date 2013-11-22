passportjs-authentication
=========================

Provides multiple authentication schemes present in passportjs.
For external providers with Oauth2 scheme, the access keys have been stored in private-settings.js
As this is placed in gitignore, this file needs to be recreated on the root of the project with content as follows:

    var ids = {
    facebook: {
     clientID: 'get_your_own',
     clientSecret: 'get_your_own',
     callbackURL: 'http://127.0.0.1:8080/auth/facebook/callback'
    },
    twitter: {
     consumerKey: 'get_your_own',
     consumerSecret: 'get_your_own',
     callbackURL: "http://127.0.0.1:8080/auth/twitter/callback"
    },
    github: {
     clientID: 'get_your_own',
     clientSecret: 'get_your_own',
     callbackURL: "http://127.0.0.1:8080/auth/github/callback"
    },
    google: {
     returnURL: 'http://127.0.0.1:8080/auth/google/callback',
     realm: 'http://127.0.0.1:8080'
    }
    }
    
    module.exports = ids

Also, please ensure the callback urls used in the application & in external applications match with the actual url in place.
