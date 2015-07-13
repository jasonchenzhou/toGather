var crypto = require('crypto');
var User = require('../models/user.js');
//var express = require('express');
//var router = express.Router();

/* GET home page. */
module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index', {
			title: 'home page',
			user:  req.session.user,
			success:  req.flash('success').toString(),
			error:  req.flash('error').toString()
		});
	});

	app.get('/reg', function(req, res){
		res.render('reg', {
			title: 'register',
			user:  req.session.user,
			success:  req.flash('success').toString(),
			error:  req.flash('error').toString()
		});
	});

	app.post('/reg', function(req, res){
        var name = req.body.name,
            password = req.body.password,
            password_re = req.body['password-repeat'];
        if(password_re != password){
        	req.flash('error', 'not same password');
        	return res.redirect('/reg');
        }
        //create md5 of password
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        var newUser = new User({
        	name: name,
        	password: password,
        	email: req.body.email
        });

        //check user whether existed
        User.get(newUser.name, function(err, user){
        	if(err){
        		req.flash('error', err);
        		return res.redirect('/');
        	}
        	if(user){
        		req.flash('error', 'user existed!');
        		return res.redirect('/reg');
        	}
        	//not existed, add it
        	newUser.save(function(err, user){
        		if(err){
        			req.flash('error', err);
        			return res.redirect('/reg');
        		}
        		req.session.user = user;
        		req.flash('success', 'register successfully!');
        		res.redirect('/');
        	});
        });   
	});

	app.get('/login', function(req,res){
        res.render('login', {
        	title: 'Login',
        	user:  req.session.user,
        	success:  req.flash('success').toString(),
        	error:  req.flash('error').toString()
        });
	});

	app.post('/login', function(req, res){
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        //check whether username existed
        User.get(req.body.name, function(err,user){
        	if(!user){
        		req.flash('error', 'user not exist!');
        		return res.redirect('/login');
        	}
        	//check password
        	if(user.password != password){
        		req.flash('error', 'password error!');
        		return res.redirect('/login');
        	}
        	//check ok, store in session
        	req.session.user = user;
        	req.flash('success', 'Login successfully!');
        	res.redirect('/');
        });
	});

	app.get('/post', function(req, res){
		res.render('post', {title: 'Post'});
	});

	app.post('/post', function(req, res){

	});

	app.get('/logout', function(req, res){
        req.session.user = null;
        req.flash('success', 'Logout successfully!');
        res.redirect('/');
	});


}
