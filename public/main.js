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
  //used to get the users uid to save chat messages into their own collection
  var user; 
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;


  // Log out event
	btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        console.log("signout");
    });

    // submit button
    submitButtonElement.addEventListener('click', e => {
        //test https request
        const addMessage = firebase.functions().httpsCallable('addMessage');
        addMessage({ text: messageInputElement.value, dateAndTime: dateTime }).then(result => {
          console.log("Text successfully sent: ", result.data);
        });
    });
    
    // Realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
      user = firebaseUser.uid;
			console.log(user);
      const ref = firebase.firestore().collection("/messages/users/"+user);
      // fires this function everytime there 
      // is a change to the database
      ref.onSnapshot(snapshot => {
      // front end code to retrieve chats from database
      let requests = [];
      snapshot.forEach(doc => {
        requests.push({...doc.data()});
      });

      console.log(requests);

      let html = '';
      requests.forEach(request => {
        html += `<p>${request.text}</p>`
      });
      document.querySelector('ul').innerHTML = html;
    });

		} else {
            console.log('No user signed in currently');
            window.location.replace("/index.html")
		}
	});

  // Returns true if a user is signed-in.
  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }
  