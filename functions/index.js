const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Painful setup process lmao!");
});

exports.getData = functions.https.onRequest((req, res) => {
    admin
        .firestore()
        .collection('userQuestionsBot')
        .get()
        .then((data) => {
            let myArray = [];
            data.forEach((doc) => {
                myArray.push(doc.id);
            });
            return res.json(myArray);
        })
        .catch((err) => console.error(err));
});