const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = (data, cb) => {
  User.find({ email: data.email }, (err, exists) => {
    if (err) {
      cb({ status: 500 });
    } else if (exists.length != 0) {
      cb({ status: 409, message: 'User already exists' });
    } else {
      bcrypt.hash(data.password, 10, (err, hash) => {
        new User(Object.assign(data, { password: hash })).save((err, user) => {
          err ? cb({ status: 500 }) : cb(null, user);
        });
      });
    }
  });
};
