const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();

/* Public Resource Share Default */
const cors = require('cors')({origin: true});
app.use(cors);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/* Acheive access to database through admin */
admin.initializeApp();

// GET
app.get('/message', (req, res) => {
  let user = req.query.userId;
  admin
    .firestore()
    .collection('messages/users/'+user)
    .orderBy('timestamp', 'desc')
    .get()
    .then((data) => {
      let msgs = [];
      data.forEach((doc) => {
        msgs.push({
          msgID: doc.id,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
          userId: doc.data().userId
        });
      });
      return res.json(msgs);
    })
    .catch((err) => console.error(err));
});

// POST 
app.post('/message', (req, res) => {
  let user = req.body.userId;
  const newMsg = {
    text: req.body.text,
    userId: req.body.userId,
    timestamp: Math.floor((new Date()).getTime() / 1000)
  };

  admin
    .firestore()
    .collection('messages/users/'+user)
    .add(newMsg)
    .then((doc) => {
      return res.json({ 
        message: `document ${doc.id} created successfully in firestore`
      });
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went oopsie' });
      return err;
    });
});

exports.api = functions.https.onRequest(app);
// Export app for Testing with mocha/supertest. 
// need to create new function for testing otherwise
// Comment code above and uncomment code below
// module.exports = app;
