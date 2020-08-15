const express = require('express');
const router = express.Router();

const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

router.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) return res.status(409).json(err);

    const newUser = new User(req.body);

    newUser.save((err, user) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(req.body);
    });
  });
});

router.post('/signin', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.status(401).json(err);
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json(err);
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).json(err);

        return res
          .cookie('x_auth', user.token, {
            sameSite: 'strict',
          })
          .status(200)
          .json(user);
      });
    });
  });
});

router.get('/signout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.status(400).json(err);
    return res.status(200).clearCookie('x_auth').clearCookie('io').json(user);
  });
});

router.get('/auth', auth, (req, res) => {
  return res.status(200).json(req.user);
});

module.exports = router;
