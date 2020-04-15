const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();

/* Public Resource Share Default */
var cors = require('cors'); 
app.use(cors());

/* Acheive access to database through admin */
admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

// Saves message to User conversation with bot //
exports.addMessage = functions.https.onCall((data, context) => {
    const text = data.text;
    // Checking attribute.
    if (!(typeof text === 'string') || text.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
          'one arguments "text" containing the message text to add.');
    }
    // Authentication / user information is automatically added to the request.
    const uid = context.auth.uid;
    // Saving the new message to the database. returning the promise
    return db.collection('/messages/users/' + uid).add({
      text: data.text,
      timestamp: data.dateAndTime,
    }).then(() => {
      console.log('New Message written');
      return { text: text };
    })
      .catch((error) => {
      // Re-throwing the error as an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('unknown', error.message, error);
      });
  });