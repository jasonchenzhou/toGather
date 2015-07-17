var mongodb = require('./db');
var markdown = require('markdown').markdown;

function Post(name, title, loc, post){
	this.name = name;   //username
	this.title = title;
    this.loc = loc;      // add new location!
	this.post = post; //lines of article
}

module.exports = Post;

Post.prototype.save = function(callback){
	var date = new Date();
	var time = {
		date: date,
		year: date.getFullYear(),
		month: date.getFullYear() + "-" + (date.getMonth() + 1),
		day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()),
		minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    }

    var post = {
    	name: this.name,
    	time: time,
    	title: this.title,
        loc: this.loc,
    	post: this.post,
        comments: []
    };

    mongodb.open(function(err, db){
    	if(err)  return callback(err);
    	db.collection('posts', function(err, collection){
    		if(err){
    			mongodb.close();
    			return  callback(err);
    		}
    		collection.insert(post, {safe: true}, function(err){
    			mongodb.close();
    			if(err)  return callback(err);
    			callback(null);
    		});
    	});
    });
};

//all articles of a user
Post.getAll = function(name, callback){
    mongodb.open(function(err, db){
        if(err)  return callback(err);
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.cloes();
                return  callback(err);
            }
            var query = {};
            if(name)  query.name = name;
            collection.find(query).sort({time: -1}).toArray(function(err, docs){
                mongodb.close();
                if(err)  return  callback(err);
                docs.forEach(function(doc){
                    doc.post = markdown.toHTML(doc.post);
                });
                callback(null, docs);
            });
        });
    });
};

//just one article
Post.getOne = function(name, day, title, loc, callback){
    mongodb.open(function(err, db){
        if(err)  return callback(err);
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return  callback(err);
            }
            collection.findOne({
                "name":  name,
                "time.day":  day,
                "title":  title,
                "loc": loc
            }, function(err, doc){
                mongodb.close();
                if(err)  return callback(err);
                if(doc){
                    doc.post = markdown.toHTML(doc.post);
                    doc.comments.forEach(function(comment){
                        comment.content = markdown.toHTML(comment.content);
                    });    
                }
                callback(null, doc);
            });
        });
    });
};

//ten of this user!
Post.getTen = function(name, page, callback){
    mongodb.open(function(err, db){
        if(err)  return callback(err);
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return  callback(err);
            }
            var query = {};
            if(name)  query.name = name;
            collection.count(query, function(err, total){  //total is total number of this name
                collection.find(query, {
                    skip: (page - 1) * 10,
                    limit: 10
                }).sort({time: -1}).toArray(function(err, docs){
                    mongodb.close();
                    if(err)  return  callback(err);
                    docs.forEach(function(doc){
                        doc.post = markdown.toHTML(doc.post);
                    });
                    callback(null, docs, total);
                });
            });
        });
    });
};


Post.edit = function(name, day, title, loc, callback){
    mongodb.open(function(err, db){
        if(err)  return  callback(err);
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return  callback(err);
            }
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title,
                "loc": loc
            }, function(err, doc){
                mongodb.close();
                if(err)  return callback(err);
                callback(null, doc);
            });
        });
    });
};


Post.update = function(name, day, title, loc, post, callback){
    console.log("enter here!");
    mongodb.open(function(err, db){
        if(err){
            console.log('failed open db!');
            return  callback(err);    
        }
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return  callback(err);
            }
            collection.update({
                "name": name,
                "time.day": day,
                "title": title,
                "loc": loc
            }, {
                $set: {post: post}
            }, function(err){
                mongodb.close();
                if(err){
                    console.log('update failed!!!!!!');
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};

//search party by location!
Post.search = function(keyword, callback){
    mongodb.open(function(err, db){
        if(err)  return  callback(err);
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return  callback(err);
            }
            var pattern = new RegExp(keyword, "i");
            collection.find({"loc": pattern}, {
                "name": 1,
                "time": 1,
                "title": 1,
                "loc": 1
            }).sort({time: -1}).toArray(function(err, docs){
                mongodb.close();
                if(err)  return  callback(err);
                callback(null, docs);
            });
        });
    });
};


Post.remove = function(name, day, title, loc, callback){
    mongodb.open(function(err, db){
        if(err)  return callback(err);
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.remove({
                "name": name,
                "time.day": day,
                "title": title,
                "loc": loc
            }, {w: 1},
            function(err){
                mongodb.close();
                if(err)  return callback();
                callback(null);
            })
        })
    })
}
