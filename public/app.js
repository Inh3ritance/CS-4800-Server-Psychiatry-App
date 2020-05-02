(()=> {

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

	// Getting our elements from DOM
	const txtEmail = document.getElementById('email');
	const txtPassword = document.getElementById('password');
	const btnLogin = document.getElementById('btnLogin');
	const btnSignUp = document.getElementById('btnSignUp');
	const forgotPass = document.getElementById('forgotPass');

	// Add log-in event
	btnLogin.addEventListener('click', e => {
		// Get email and pass
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		// Sign In
		const promise = auth.signInWithEmailAndPassword(email,
		pass);
		promise.catch(e => 
			console.log(e.message));
	});

	// Add signup event
	btnSignUp.addEventListener('click', e => {
		// Get email and pass
		// TODO: check to make sure users input is 
		// a real email address

		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();

		// Check if email and password correct length
		if (email.length < 4) {
		   alert('Please enter an email address.');
		   return;
		}
		if (pass.length < 4) {
		   alert('Please enter a password.');
		   return;
		 }

		// Create user
		const promise = auth.createUserWithEmailAndPassword(email,
		pass);
		promise.catch(e => console.log(e.message));		
	});

	// Forgot password event
	forgotPass.addEventListener('click', e => {
		const email = txtEmail.value;
		firebase.auth().sendPasswordResetEmail(email).then(function() {
  			// Email sent.
  			console.log("Password reset email sent, nice!");
		}).catch(function(error) {
			console.log(error);
			alert("Please enter email to recieve password reset link");
  			// An error happened.
		});
	})

	// a realtime listener to see if user is signed in or not
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			console.log(firebaseUser);
			window.location.replace("/chatpage.html");
			// TODO: method to not allow random ppl to type to bot
			// without signing in first
		} else {
			console.log('No user signed in currently');
		}
	});

});