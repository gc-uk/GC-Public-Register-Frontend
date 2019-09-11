const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const dateFilter = require('nunjucks-date-filter');
const markdown = require('nunjucks-markdown');
const marked = require('marked');
const sessionInMemory = require('express-session');
const routes = require('./routes/routes');
const utils = require('./utils.js');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1)

const PATH_TO_TEMPLATES = path.join(__dirname, 'views');

let env = nunjucks.configure(PATH_TO_TEMPLATES, {
  autoescape: true,
  express: app
});

env.addFilter('date', dateFilter);
markdown.register(env, marked);

app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '/public')))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionName = 'gc-service-' + (Buffer.from('prod-ur-service', 'utf8')).toString('hex')
let sessionOptions = {
  secret: sessionName,
  cookie: {
    maxAge: 1000 * 60 * 60 * 4, // 4 hours
    secure: false
  }
}

app.use(sessionInMemory(Object.assign(sessionOptions, {
  name: sessionName,
  resave: false,
  saveUninitialized: false
})))

app.use(utils.autoStoreData)
utils.addCheckedFunction(env)

app.use('/', routes);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message)
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;