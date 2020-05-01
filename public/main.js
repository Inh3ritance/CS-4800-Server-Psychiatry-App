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
  var botReponse = document.getElementById('response');
  //used to get the users uid to save chat messages into their own collection
  var user; 
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const Url = 'https://us-central1-cs-4800-backend-server.cloudfunctions.net/api/message';
  

  // Log out event
	btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        console.log("signout");
    });
    
    // Realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
      user = firebaseUser.uid;
			console.log(user);
      const ref = firebase.firestore().collection("/messages/users/"+user);
      let sortedRef = ref.orderBy('timestamp','asc');
      // fires this function everytime there 
      // is a change to the database
      sortedRef.onSnapshot(snapshot => {
      // front end code to retrieve chats from database

      //


      //
      let requests = [];
      snapshot.forEach(doc => {
        requests.push({...doc.data()});
      });

      console.log(requests);

      let html = '';
      requests.forEach(request => {
        html += `<p class = "text">${request.text}</p>`
      });
      document.querySelector('ul').innerHTML = html;
    });

		} else {
            console.log('No user signed in currently');
            window.location.replace("/index.html")
		}
  });
  
  submitButtonElement.addEventListener('click', e => {    
    const data = JSON.stringify({
      text: messageInputElement.value,
      userId: user
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };

    fetch(Url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    //delays call to send input to database so it stays in order
    setTimeout(function() { botSendResponseToDb(); }, 6000);
  });

  
  // send bot repsosnes to db
  function botSendResponseToDb() {
    const botRepData = JSON.stringify({
      text: botReponse.innerHTML,
      userId: user
    });

    var requestOptions1 = {
      method: 'POST',
      headers: myHeaders,
      body: botRepData,
      redirect: 'follow'
    };

    fetch(Url, requestOptions1)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  

  // Returns true if a user is signed-in.
  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }
  