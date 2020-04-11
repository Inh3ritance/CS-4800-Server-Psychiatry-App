  //Initializing Firebase
	const config = {
    	apiKey: "",
    	// Put in apiKey to test it out authentication
    	authDomain: "cs-4800-backend-server.firebaseapp.com",
    	databaseURL: "https://cs-4800-backend-server.firebaseio.com",
    	projectId: "cs-4800-backend-server",
    	storageBucket: "cs-4800-backend-server.appspot.com",
    	messagingSenderId: "767965540098",
    	appId: "1:767965540098:web:77527f43aec0d7d07a9c1b",
    	measurementId: "G-GKYHGS54QX",
    };
    firebase.initializeApp(config);
    var functions = firebase.functions();

  // Shortcuts to DOM Elements.
  var messageListElement = document.getElementById('messages');
  var messageFormElement = document.getElementById('message-form');
  var submitButtonElement = document.getElementById('send');
  var userNameElement = document.getElementById('user-name');
  const btnLogout = document.getElementById("btnLogout");
  var messageInputElement = document.getElementById('input'); 
  var user; 

  // Log out event
	btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        console.log("signout");
    });

    // submit button
    submitButtonElement.addEventListener('click', e => {
        //test https request
        addMessage();
        //onMessageFormSubmit(messageInputElement);
        console.log("Sending message to firestore");
    });
    
    // Realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
      user = firebaseUser.uid;
			console.log(user);
		} else {
            console.log('No user signed in currently');
            window.location.replace("/index.html")
		}
	});

  // Returns true if a user is signed-in.
  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }
  
  // Saves a new message to your Cloud Firestore database.
  function saveMessage(messageText) {
    // Add a new message entry to the database based on uid.
    return firebase.firestore().collection("/messages/users/"+user).add({
      uid: user,
      text: messageText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(function(error) {
      console.error('Error writing new message to database', error);
    });
  }
  
  // Loads chat messages history and listens for upcoming ones.
  function loadMessages() {
    // Create the query to load the last 12 messages and listen for new ones.
    var query = firebase.firestore()
                    .collection('/messages/users/'+user)
                    .orderBy('timestamp')
                    .limit(12);

    query.onSnapshot(function(snapshot) {
      snapshot.docChanges().forEach(function(change) {
          var message = change.doc.data();
          console.log("im here");
          console.log(message.text);
          //displayMessage(message.text, message.timestamp);
      });
    });
  }

  loadMessages();

  // Triggered when the send new message form is submitted.
  function onMessageFormSubmit(e) {
    //e.preventDefault();
    // Check that the user entered a message and is signed in.
    if (messageInputElement.value && checkSignedInWithMessage()) {
      saveMessage(messageInputElement.value).then(function() {
        // Clear message text field and re-enable the SEND button.
        //resetMaterialTextfield(messageInputElement);
        //toggleButton();
      });
    }
  }
  
  // Returns true if user is signed-in. Otherwise false and displays a message.
  function checkSignedInWithMessage() {
    // Return true if the user is signed in Firebase
    if (isUserSignedIn()) {
      return true;
    }
  
    // Display a message to the user using a Toast.
    var data = {
      message: 'You must sign-in first',
      timeout: 2000
    };
    signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
    return false;
  }
  
  
  // Delete a Message from the UI.
  function deleteMessage(id) {
    var div = document.getElementById(id);
    // If an element for that message exists we delete it.
    if (div) {
      div.parentNode.removeChild(div);
    }
  }
  
  // Enables or disables the submit button depending on the values of the input
  // fields.
  function toggleButton() {
    if (messageInputElement.value) {
      submitButtonElement.removeAttribute('disabled');
    } else {
      submitButtonElement.setAttribute('disabled', 'true');
    }
  }


  // Displays a Message in the UI.
function displayMessage(text, timestamp) {
  //var div = document.getElementById(id) || createAndInsertMessage(id, timestamp);
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } 
}

  // We load currently existing chat messages and listen to new ones.
  //loadMessages();
function addMessage() {
  console.log(messageInputElement.value);
  var addMessage = firebase.functions().httpsCallable('addMessage');
  addMessage({text: messageInputElement.value}).then(function(result) {
    // Read result of the Cloud Function.
    var returnmsg = result.data.text;
  }).catch(function(error) {
    // Getting the Error details.
    var code = error.code;
    var message = error.message;
    var details = error.details;
    // ...
  });

}

