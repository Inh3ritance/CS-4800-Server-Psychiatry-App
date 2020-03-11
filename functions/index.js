const functions = require('firebase-functions');
const admin = require('firebase-admin');

const express = require('express');
const app = express();

admin.initializeApp(functions.config().firebase);
let db = admin.firestore();

// I know some of these functions seem redundant
// but for now lets just work with this so 
// we have an idea what we are doing

app.get('/userQuestionsBot', (req, res) => {
        db
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

// Cached version Content delivery Network CDN

app.get('/userQuestionsBot-cached'. (req, res) => {
        response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
        db
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


app.get('/userFeelsSad', (req, res) => {
        db
        .collection('userFeelsSad')
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

app.get('/userIsMad', (req, res) => {
    db
    .collection('userNullResponse')
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

app.get('/userIsMad', (req, res) => {
    db
    .collection('userIsMad')
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

app.get('/userIsDepressed', (req, res) => {
    db
    .collection('userIsDepressed')
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

app.get('/userFeelsNervous', (req, res) => {
    db
    .collection('userFeelsNervous')
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

app.get('/random', (req, res) => {
    db
    .collection('random')
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

app.get('/userQuestionsBot', (req, res) => {
    db
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

//end outputs


//Start of inputs
// app.post(){

// }


exports.app = functions.https.onRequest(app);


// visit 
// https://us-central1-cs-4800-backend-server.cloudfunctions.net/api/{functionName}
// to see the response from the function


/*exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Painful setup process lmao!");
});*/

