const express = require('express'),
  router = express.Router(),
  usersAPI = require('../bin/usersAPI'),
  passport = require('passport');

router.get('/login', (req, res) => {
  // usersAPI.createUser(
  //   {
  //     firstName: 'branchManager',
  //     lastName: 'branchManager',
  //     email: 'branchManager@gmail.com',
  //     password: '43898561',
  //     mode: 'branchManager'
  //   },
  //   (err, user) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(user);
  //     }
  //   }
  // );
});

router.post('/login', (req, res, next) => {
  const mode = req.body.mode;
  if (mode != 'chairman' && mode != 'businessManager' && mode != 'branchManager' && mode != 'teacher') {
    res.status(400).end();
  }

  passport.authenticate('local.user', function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).end();
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      } else if (user.mode != mode) {
        return res.status(403).end();
      }
      return res.status(200).json({
        success: true,
        redirect: mode
      });
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
