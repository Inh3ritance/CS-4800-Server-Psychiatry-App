const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
var cors = require('cors'); 
// will grant access to only whitelisted sites and local hosting! 
// Update with URL config
const app = express();

app.use(cors());

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage = functions.https.onCall((data, context) => {
    // Message text passed from the client.
    const text = data.text;
    // Checking attribute.
    if (!(typeof text === 'string') || text.length === 0) {
      // Throwing an HttpsError so that the client gets the error details.
      throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
          'one arguments "text" containing the message text to add.');
    }
  
    // Authentication / user information is automatically added to the request.
    const uid = context.auth.uid;
  
    // Saving the new message to the database.
    return db.collection('/messages/users/'+uid).add({
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      console.log('New Message written');
      // Returning the message to the client.
      return { text: text };

    })
      .catch((error) => {
      // Re-throwing the error as an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('unknown', error.message, error);
      });
  });