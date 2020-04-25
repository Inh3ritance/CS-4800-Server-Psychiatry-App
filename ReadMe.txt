For integrating Server Side API into your project please add this to your HTML:

//
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.8.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "",
    authDomain: "cs-4800-backend-server.firebaseapp.com",
    databaseURL: "https://cs-4800-backend-server.firebaseio.com",
    projectId: "cs-4800-backend-server",
    storageBucket: "cs-4800-backend-server.appspot.com",
    messagingSenderId: "767965540098",
    appId: "1:767965540098:web:ec779de551e217a67a9c1b",
    measurementId: "G-2KNZEDE4ZS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
//