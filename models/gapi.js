var googleapis = require('googleapis');
    OAuth2 = googleapis.auth.OAuth2,
    client = '213998654698-goo1st41l4g1qir0qklk4d802ggjc4jr.apps.googleusercontent.com',
    secret = 'mx0XkmPCc5kMtmhNK1O70TZn',
    redirect = 'http://localhost:3000/oauth2callback',
    plus = googleapis.plus('v1');

var oauth2Client = new OAuth2(client, secret, redirect);
var url = '';

var scopes = [
    'https://www.googleapis.com/auth/plus.me'
];

url = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: scopes
});

exports.url = url;

exports.client = oauth2Client;
exports.plus = plus;
/*
googleapis
    .discover('oauth2', 'v2')
    .discover('calendar', 'v3')
    .execute(function(err, client){
    	if(!err)    callback(client);
    });

var callback = function(clients){
	console.log(clients);
	exports.cal = clients.calendar;
	exports.oauth = clients.oauth2;
	exports.client = oauth2Client;
	exports.url = url;
}
*/
/*
function getAccessToken(oauth2Client, callback) {
    oauth2Client.getToken(code, function(err, tokens) {
      oauth2Client.setCredentials(tokens);
      callback();
    });
}
*/
/*
exports.getProfile = getAccessToken(oauth2Client, function(){
	plus.people.get({userId: 'me', auth:'oauth2Client'}, function(err, profile){
		if(err){
			console.log("error happens");
			return;
		}
		console.log(profile.displayName, ':', profile.tagline);  
    });
});
*/
/*
var client;
googleapis
    .discover('plus', 'v1')
    .execute(function(err, data){
    	client = data;
    });


    

module.exports = oauth2;


oauth2.prototype.url = function(callback){
	oauth2.generateAuthUrl({
	access_type: 'offline',
	scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
});
}




oauth2.prototype.getToken = function(code, function(err, tokens){
	oauth2.credentials = tokens;
	client.plus.people.get({userId: 'me'})
	    .withAuthClient(oauth2)
	    .execute(function(err, result));
});

*/
