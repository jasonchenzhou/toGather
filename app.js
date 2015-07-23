var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var multer = require('multer');

var app = express();

// view engine setup

app.set('port', process.env.PORT || '3000');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());

/*
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(flash());
*/


// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({
  dest: './public/images',
  rename: function(fieldname, filename){return filename;}
}));

/*app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,      //cookiw name
  cookie: {maxAge: 1000*60*60*24*30},    //30 days
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port
  })
}));  */
app.use(session({secret: settings.cookieSecret}));



app.use(session({
	secret: 'keyboard '
}));


routes(app);

app.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
