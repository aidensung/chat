const express = require('express');
const router = express.Router();

const { Chat } = require('../models/Chat');
const { auth } = require('../middleware/auth');

const { io } = require('../server');

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

router.get('/getmessages', auth, (req, res) => {
  Chat.find()
    .populate('sender')
    .exec((err, messages) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(messages);
    });
});

router.post('/sendmessage', auth, (req, res) => {
  const message = new Chat({
    content: req.body.content,
    sender: req.body.sender,
    type: req.body.type,
    time: req.body.time,
  });

  message.save((err, doc) => {
    console.log(doc.sender.firstname);
    if (err) res.status(500).json(err);

    Chat.find({ _id: doc._id })
      .populate('sender')
      .exec((err, message) => {
        io.emit('message', message);
      });

    res.status(200).json(doc);
  });
});

module.exports = router;
