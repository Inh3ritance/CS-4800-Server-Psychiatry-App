/*firebase.initializeApp({
  apiKey: 'AIzaSyD_GOu9Qy1FFP0eKKZOE6t4lzAegqHwvvw',
  authDomain: 'cs-4800-backend-server.firebaseapp.com',
  projectId: 'cs-4800-backend-server'
});


// Your web app's Firebase configuration
var firebaseConfig = {
    //DONT FORGET TO REMOVE THE API KEY FOR THE DEPLOY!!!!!!!!  -Kenny//
		apiKey: "AIzaSyD_GOu9Qy1FFP0eKKZOE6t4lzAegqHwvvw",
		authDomain: "cs-4800-backend-server.firebaseapp.com",
		databaseURL: "https://cs-4800-backend-server.firebaseio.com",
		projectId: "cs-4800-backend-server",
		storageBucket: "cs-4800-backend-server.appspot.com",
		messagingSenderId: "767965540098",
		appId: "1:767965540098:web:ec779de551e217a67a9c1b",
        measurementId: "G-2KNZEDE4ZS" 
}; 

    firebase.initializeApp(firebaseConfig);
	/*
    var firestore = firebase.firestore();

    const docRef = firestore.doc("Inputs/Woohoo");
    const feelings = firestore.doc("Inputs/Feelings");
    const greetings = firestore.doc("Inputs/Greetings");
    const nullResponse = firestore.doc("Inputs/Null");
    const outputHeader = document.querySelector("#Queries");
    const inputTextField = document.querySelector("#question");
    const askMeButton = document.querySelector("#askMeButton");

    //load queries
	
    docRef.get().then(function(doc) {
        if(doc.exists) {
            console.log("Documented data:", doc.data().Woohoo);
        } else {
            console.log("Something went wrong bro");
        }
    }).catch(function(error) {
        console.log(error);
    });

    askMeButton.addEventListener("click", function() {
        var input = document.getElementById('question').value;
        if (input.length == 0) {
            nullResponse.get().then(function (doc) {
                if (doc && doc.exists) {
                    var myData = doc.data();
                    console.log(myData);
                    outputHeader.innerText = myData.Null;
                }
            }).catch(function (error) {
                console.log("Got an error: ", error);
            });
        }
    });*/
