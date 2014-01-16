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
 callbackURL: "http://127.0.0.1:8080/auth/github/callback",
 userAgent: 'http://127.0.0.1:8080'
},
google: {
 returnURL: 'http://127.0.0.1:8080/auth/google/callback',
 realm: 'http://127.0.0.1:8080'
}
}

module.exports = ids
