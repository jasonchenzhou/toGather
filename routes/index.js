var crypto = require('crypto');
var User = require('../models/user.js');
var Post = require('../models/post.js');
var Comment = require('../models/comments.js')
//var express = require('express');
//var router = express.Router();

/* GET home page. */
module.exports = function(app){
	app.get('/', function(req, res){
        Post.getAll(null, function(err, posts){
            if(err)  posts = [];
            res.render('index', {
                title: 'home page',
                user:  req.session.user,
                posts: posts,
                success:  req.flash('success').toString(),
                error:  req.flash('error').toString()
            });
        });
	});

    app.get('/reg', checkNotLogin);
	app.get('/reg', function(req, res){
		res.render('reg', {
			title: 'register',
			user:  req.session.user,
			success:  req.flash('success').toString(),
			error:  req.flash('error').toString()
		});
	});

    app.post('/reg', checkNotLogin);
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

    app.get('/login', checkNotLogin);
	app.get('/login', function(req,res){
        res.render('login', {
        	title: 'Login',
        	user:  req.session.user,
        	success:  req.flash('success').toString(),
        	error:  req.flash('error').toString()
        });
	});

    app.post('/login', checkNotLogin);
	app.post('/login', function(req, res){

        console.log("log in now!!");

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

    app.get('post', checkLogin);
	app.get('/post', function(req, res){
		res.render('post', {
            title: 'Post',
            user:  req.session.user,
            success:  req.flash('success').toString(),
            error:  req.flash('error').toString()
        });
	});

    app.post('/post', checkLogin);
	app.post('/post', function(req, res){
        var currentUser = req.session.user;
        var post = new Post(currentUser.name, req.body.title, req.body.post);
        post.save(function(err){
            if(err){
                req.flash('error', err);
                return res.redirect('/');
            }
            req.flash('success', 'Post successfully');
            res.redirect('/');
        });
	});

    app.get('/logout', checkLogin);
	app.get('/logout', function(req, res){
        req.session.user = null;
        req.flash('success', 'Logout successfully!');
        res.redirect('/');
	});


    app.get('/upload', checkLogin);
    app.get('/upload', function(req, res){
        res.render('upload', {
            title: 'File Upload',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/upload', checkLogin);
    app.post('/upload', function(req, res){
        req.flash('success', 'File upload success!');
        res.redirect('/upload');
    });

    app.get('/u/:name', function(req, res){
        //see whether user existed
        User.get(req.params.name, function(err, user){
            if(!user){
                req.flash('error', 'User not existed!');
                return  res.redirect('/');
            }
            Post.getAll(user.name, function(err, posts){
                if(err){
                    req.flash('error', err);
                    return  res.redirect('/');
                }
                res.render('user', {
                    title: user.name,
                    posts: posts,
                    user: req.session.user,
                    success:  req.flash('success').toString(),
                    error:  req.flash('error').toString()
                });
            });
        });
    });


    app.get('/u/:name/:day/:title', checkLogin);
    app.get('/u/:name/:day/:title', function(req, res){

        var currentUser = req.session.user;
        Post.edit(currentUser.name, req.params.day, req.params.title, function(err, post){
            if(err){
                req.flash('error', err);
                return  res.redirect('back');
            }
            res.render('article', {
                //title: 'Edit',
                title: req.params.title,
                post: post,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });


    app.post('/u/:name/:day/:title', function(req, res){
        var date = new Date(),
            time = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes()<10 ? '0'+date.getMinutes : date.getMinutes());
            var comment = {
                name: req.body.name,
                email: req.body.email,
                website: req.body.website,
                time: time,
                content: req.body.content
            };

            var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);
            newComment.save(function(err){
                if(err){
                    req.flash('error', err);
                    return res.redirect('back');
                }
                req.flash('success', 'Comment success!');
                res.redirect('back');
            });
    });
 

    app.get('/edit/:name/:day/:title', checkLogin);
    app.get('/edit/:name/:day/:title', function(req, res){
        var currentUser = req.session.user;
        Post.edit(currentUser.name, req.params.day, req.params.title, function(err, post){
            if(err){
                req.flash('error', err);
                return  res.redirect('back');
            }
            res.render('edit', {
                title: 'Edit',
                post: post,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });


    app.post('/edit/:name/:day/:title', checkLogin);
    app.post('/edit/:name/:day/:title', function(req, res){
        var currentUser = req.session.user;

        //console.log(currentUser);
        //console.log("start post edit!!!")

        Post.update(currentUser.name, req.params.day, req.params.title, req.body.post, function(err){
            var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
            if(err){
                req.flash('error', err);
                return  res.redirect(url);
            }
            req.flash('success', 'Edit success!');
              res.redirect(url);
        });
    });


    app.get('/remove/:name/:day/:title', checkLogin);
    app.get('/remove/:name/:day/:title', function(req, res){
        var currentUser = req.session.user;
        Post.remove(currentUser.name, req.params.day, req.params.title, function(err){
            if(err){
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', 'delete success!');
            res.redirect('/');
        });
    });


    function checkLogin(req, res, next){
        if(!req.session.user){
            req.flash('error', 'Not Login!');
            res.direct('/login');
        }
        next();
    }

    function checkNotLogin(req, res, next){
        if(req.session.user){
            req.flash('error', 'already login!');
            res.redirect('back');
        }
        next();
    }


}
