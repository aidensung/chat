const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const { io } = require('../server');

// const multer = require('multer');
// const crypto = require('crypto');
// const path = require('path');
// const GridFsStorage = require('multer-gridfs-storage');

// const config = require('../config/key');

const { Chat } = require('../models/Chat');
const { auth } = require('../middleware/auth');

// const conn = mongoose.createConnection(config.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

// let gfs;

// conn
//   .once('open', () => {
//     gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//       bucketName: 'uploads',
//     });
//   })
//   .then(() => {
//     console.log('GridFS connected...');
//   });

io.on('connection', (socket) => {
  console.log('a user connected...');

  socket.on('disconnect', () => {
    console.log('user disconnected...');
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
  const message = new Chat(req.body);

  io.emit('message', req.body);

  message.save((err, doc) => {
    if (err) res.status(500).json(err);

    res.status(200).json(doc);
  });
});

// const storage = new GridFsStorage({
//   url: config.MONGO_URI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// router.post('/uploadfiles', upload.single('file'), (req, res) => {
//   gfs.find({ filename: req.file.filename }).toArray((err, files) => {
//     if (!files[0] || files.length === 0) {
//       return res.status(200).json({
//         success: false,
//         message: 'No files available',
//       });
//     }

//     if (
//       files[0].contentType === 'image/jpeg' ||
//       files[0].contentType === 'image/jpg' ||
//       files[0].contentType === 'image/png'
//     ) {
//       gfs.openDownloadStreamByName(req.file.filename).pipe(res);
//     } else {
//       res.status(404).json({
//         err: 'Not an image',
//       });
//     }
//   });

//   // return res.json(res.req.file);
// });

module.exports = router;
