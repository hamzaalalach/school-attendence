const express = require('express');
const app = express();
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const xss = require('xss-clean');
const session = require('express-session');
const passport = require('passport');
const hpp = require('hpp');
const path = require('path');
const cors = require('cors');

require('./bin/passport')(passport);

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger(':method :url :status :response-time ms :remote-addr'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	session({
		secret: 'someSecretHere',
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 3600000
		}
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/home'));
app.use('/chairman', require('./routes/chairman'));
app.use('/users', require('./routes/users'));
require('./bin/db').connectDB();

module.exports = app;
