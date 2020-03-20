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
    const db = firebase.firestore();
    var output = document.getElementById("output");
    var greet = document.getElementById("greet")
    var input = document.getElementById("input");
    var submit = document.getElementById("submit");
    // A bunch of output to innerHTML tests
    var output1 = document.getElementById("output1");
    var output2 = document.getElementById("output2");
    var output3 = document.getElementById("output3");
    var output4 = document.getElementById("output4");
    var output5 = document.getElementById("output5");
    
    //a bunch of sample input for user when they click the buttons
    
    var questionsBotInput = document.getElementById("questionsBotInput");
    var sadInput = document.getElementById("sadInput");
    var random = document.getElementById("random");
    var nervousInput = document.getElementById("nervousInput");
    var depressedInput = document.getElementById("depressedInput");
    var madInput = document.getElementById("madInput");
    
    
    /*
        This is where we can test user input parse probably
    if(input is like userQuestionsBot){
        userQuestionsBotQuery(){
            // TODO: blah blah
        }
    }
    */
    
    var ranking = Math.floor((Math.random() * 3) + 1);
    var randomRank;
    //random number between 1 and however many are in the Firestore Document/Collection
    
    
    //Initial Greeting from the Bot
    db.collection("chatGreeting").where("ranking", "==", ranking)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                console.log(doc.id);
                greet.innerHTML = doc.id;
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        }); 
    
    
    // All the functions for the buttons to test user input
    // all similar with only the change in db.collection
    
    // could be possible to maybe just make a 
    // variable that holds db collection name and call a standardize function
    // passing the document as a parameter. Would clean up all the redundant code
    // idk yet tho.. -Kenny
    
    function userQuestionsBot() {
        questionsBotInput.innerHTML = "Who are you?";
        randomRank = Math.floor((Math.random() * 3) + 1);
        db.collection("userQuestionsBot").where("ranking", "==", randomRank)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    //console.log(doc.id, " => ", doc.data());
                    console.log(doc.id);
                    output.innerHTML = doc.id;
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            }); 
    }
    
    function findHighestScore(list) {
        var highest = list[0];
        var highestIndex = 0;
        for (var x=1;x<list.length;x++) {
            if (list[x]>highest) {
                highest = list[x];
                highestIndex = x;
            }
        }
        var results = [highest, highestIndex];
        return results;
    }
    
    var phase = 1;
    submit.addEventListener("click", function() {
        var question = input.value;
        userInput.innerHTML = input.value;
        var statement = question.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        var words = statement.split(" ");
    
        if (phase==1) {
            if (question.length==0) {
                randomRank = Math.floor((Math.random() * 4) + 1);
                console.log("Empty input.");
                db.collection("userNullResponse").where("ranking", "==", randomRank)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        finalOutput.innerHTML = doc.id;
                    });
                })
                .catch(function (error) {
                    console.log("Got an error: ", error);
                });
            }
            else {
                var feelingChoice;
                if (question.search("Hello")>-1 || question.search("Hi")>-1) {
                    randomRank = Math.floor((Math.random() * 3) + 1);
                    db.collection("chatGreeting").where("ranking", "==", randomRank)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            finalOutput.innerHTML = doc.id;
                        });
                    })
                    .catch(function (error) {
                        console.log("Got an error: ", error);
                    });
                }
                else {
                    var ranking = 0;
                    var negative = 0;
                    var feelingScores = [0,0,0,0,0,0,0];
                    db.collection("inputAnger").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                        negative = 0; 
                        for (var x in words) {  
                            if (words[x]=="NOT" || words[x]=="DON'T") {
                                negative += 1;
                            }                
                            else {
                                querySnapshot.forEach(function(doc) {                                                             
                                    if (words[x]==doc.id.toUpperCase()) {                        
                                        if (negative>0) {
                                            feelingScores[0]--;
                                            negative--;
                                        }
                                        else {
                                            feelingScores[0]++;
                                        }
                                    }
                                });
                            }
                        }
                        console.log("Anger Score: " + feelingScores[0]);
                    });
                    db.collection("inputDepressed").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                        negative = 0; 
                        for (var x in words) {  
                            if (words[x]=="NOT" || words[x]=="DON'T") {
                                negative += 1;
                            }                
                            else {
                                querySnapshot.forEach(function(doc) {                                                             
                                    if (words[x]==doc.id.toUpperCase()) {                        
                                        if (negative>0) {
                                            feelingScores[1]--;
                                            negative--;
                                        }
                                        else {
                                            feelingScores[1]++;
                                        }
                                    }
                                });
                            }
                        }
                        console.log("Depressed Score: " + feelingScores[1]);
                    });
                    db.collection("inputFear").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                        negative = 0; 
                        for (var x in words) {  
                            if (words[x]=="NOT" || words[x]=="DON'T") {
                                negative += 1;
                            }                
                            else {
                                querySnapshot.forEach(function(doc) {                                                             
                                    if (words[x]==doc.id.toUpperCase()) {                        
                                        if (negative>0) {
                                            feelingScores[2]--;
                                            negative--;
                                        }
                                        else {
                                            feelingScores[2]++;
                                        }
                                    }
                                });
                            }
                        }
                        console.log("Fear Score: " + feelingScores[2]);
                    }); 
                    db.collection("inputHappy").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                        negative = 0; 
                        for (var x in words) {  
                            if (words[x]=="NOT" || words[x]=="DON'T") {
                                negative += 1;
                            }                
                            else {
                                querySnapshot.forEach(function(doc) {                                                             
                                    if (words[x]==doc.id.toUpperCase()) {                        
                                        if (negative>0) {
                                            feelingScores[3]--;
                                            negative--;
                                        }
                                        else {
                                            feelingScores[3]++;
                                        }
                                    }
                                });
                            }
                        }
                        console.log("Happy Score: " + feelingScores[3]);
                    });
                    db.collection("inputNervous").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                        negative = 0; 
                        for (var x in words) {  
                            if (words[x]=="NOT" || words[x]=="DON'T") {
                                negative += 1;
                            }                
                            else {
                                querySnapshot.forEach(function(doc) {                                                             
                                    if (words[x]==doc.id.toUpperCase()) {                        
                                        if (negative>0) {
                                            feelingScores[4]--;
                                            negative--;
                                        }
                                        else {
                                            feelingScores[4]++;
                                        }
                                    }
                                });
                            }
                        }
                        console.log("Nervous Score: " + feelingScores[4]);
                    });
                    db.collection("inputPain").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                        negative = 0; 
                        for (var x in words) {  
                            if (words[x]=="NOT" || words[x]=="DON'T") {
                                negative += 1;
                            }                
                            else {
                                querySnapshot.forEach(function(doc) {                                                             
                                    if (words[x]==doc.id.toUpperCase()) {                        
                                        if (negative>0) {
                                            feelingScores[5]--;
                                            negative--;
                                        }
                                        else {
                                            feelingScores[5]++;
                                        }
                                    }
                                });
                            }
                        }
                        console.log("Pain Score: " + feelingScores[5]);
                    });
                    db.collection("inputSad").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                        negative = 0; 
                        for (var x in words) {  
                            if (words[x]=="NOT" || words[x]=="DON'T") {
                                negative += 1;
                            }                
                            else {
                                querySnapshot.forEach(function(doc) {                                                             
                                    if (words[x]==doc.id.toUpperCase()) {                        
                                        if (negative>0) {
                                            feelingScores[6]--;
                                            negative--;
                                        }
                                        else {
                                            feelingScores[6]++;
                                        }
                                    }
                                });
                            }
                        }
                        console.log("Sad Score: " + feelingScores[6]);
                        console.log("Highest Score: " + findHighestScore(feelingScores));
                        feelingChoice = findHighestScore(feelingScores);
                        if (feelingChoice[0]==0) {
                            finalOutput.innerHTML = "I'm not sure what you mean.";
                        }
                        else {
                            switch(feelingChoice[1]) {
                                case 0:
                                    console.log("User is angry.");     
                                    phase = 3;                           
                                    finalOutput.innerHTML = "Why are you angry?";
                                    break;
                                case 1:
                                    console.log("User is depressed.");
                                    finalOutput.innerHTML = "You seem depressed.";
                                    break;
                                case 2:
                                    console.log("User is scared.");
                                    phase = 5;
                                    finalOutput.innerHTML = "Why are you scared?";
                                    break;
                                case 3:
                                    console.log("User is happy.");
                                    phase = 2;
                                    finalOutput.innerHTML = "What makes you so happy?";
                                    break;
                                case 4:
                                    console.log("User is nervous.");
                                    finalOutput.innerHTML = "You seem nervous.";
                                    break;
                                case 5:
                                    console.log("User is in pain.");
                                    finalOutput.innerHTML = "You seem in pain.";
                                    break;
                                case 6:
                                    console.log("User is sad.");
                                    phase = 4;
                                    finalOutput.innerHTML = "Why are you sad?";
                                    break;
                            }
                        }                 
                    });                                                                     
                }
            }
        }
        //Why is user happy?
        else if (phase==2) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT HAPPY")>-1) {
                phase = 1;
                finalOutput.innerHTML = "That's too bad. How do you actually feel?";
            }
            else {
                phase = 1;
                finalOutput.innerHTML = "I am glad you feel this way!";
            }
        }
        //Why is user angry?
        else if (phase==3) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT ANGRY")>-1) {
                phase = 1;
                finalOutput.innerHTML = "Alright then. How do you actually feel?";
            }
            else {
                db.collection("angryUserHasAngerIssues").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    negative = 0; 
                    for (var x in words) {  
                        if (words[x]=="NOT" || words[x]=="DON'T") {
                            
                        }                
                        else {
                            querySnapshot.forEach(function(doc) {                                                             
                                if (words[x]==doc.id.toUpperCase()) {                        
                                    if (negative>0) {
                                        
                                    }
                                    else {
                                        
                                    }
                                }
                            });
                        }
                    }
                });
                db.collection("angryUserIsGrieving").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    negative = 0; 
                    for (var x in words) {  
                        if (words[x]=="NOT" || words[x]=="DON'T") {
                            
                        }                
                        else {
                            querySnapshot.forEach(function(doc) {                                                             
                                if (words[x]==doc.id.toUpperCase()) {                        
                                    if (negative>0) {
                                        
                                    }
                                    else {
                                        
                                    }
                                }
                            });
                        }
                    }
                });
                db.collection("angryUserisFrustrated").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    negative = 0; 
                    for (var x in words) {  
                        if (words[x]=="NOT" || words[x]=="DON'T") {
                            
                        }                
                        else {
                            querySnapshot.forEach(function(doc) {                                                             
                                if (words[x]==doc.id.toUpperCase()) {                        
                                    if (negative>0) {
                                        
                                    }
                                    else {
                                        
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
        //Why is user sad?
        else if (phase==4) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT SAD")>-1) {
                phase = 1;
                finalOutput.innerHTML = "Alright then. How do you actually feel?";
            }
            else {
                db.collection("sadUserIsGrieving").where("ranking", "==", 1)
                .get()
                .then(function(querySnapshot) {
                    negative = 0; 
                    for (var x in words) {  
                        if (words[x]=="NOT" || words[x]=="DON'T") {
                        
                        }                
                        else {
                            querySnapshot.forEach(function(doc) {                                                             
                                if (words[x]==doc.id.toUpperCase()) {                        
                                    if (negative>0) {
                                    
                                    }
                                    else {
                                    
                                    }
                                }
                            });
                        }
                    }
                });
                db.collection("sadUserIsConstantlySad").where("ranking", "==", 1)
                .get()
                .then(function(querySnapshot) {
                    negative = 0; 
                    for (var x in words) {  
                        if (words[x]=="NOT" || words[x]=="DON'T") {
                        
                        }                
                        else {
                            querySnapshot.forEach(function(doc) {                                                             
                                if (words[x]==doc.id.toUpperCase()) {                        
                                    if (negative>0) {
                                    
                                    }
                                    else {
                                    
                                    }
                                }
                            });
                        }
                    }
                });
                db.collection("sadUserHasNoReason").where("ranking", "==", 1)
                .get()
                .then(function(querySnapshot) {
                    negative = 0; 
                    for (var x in words) {  
                        if (words[x]=="NOT" || words[x]=="DON'T") {
                        
                        }                
                        else {
                            querySnapshot.forEach(function(doc) {                                                             
                                if (words[x]==doc.id.toUpperCase()) {                        
                                    if (negative>0) {
                                    
                                    }
                                    else {
                                    
                                    }
                                }
                            });
                        }
                    }
                }); 
            }
        }
        //Why is user scared?
        else if (phase==5) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT SCARED")>-1) {
                phase = 1;
                finalOutput.innerHTML = "Alright then. How do you actually feel?";
            }
            else {
                db.collection("scaredUserIsPhobic").where("ranking", "==", 1)
                .get()
                .then(function(querySnapshot) {
                    negative = 0; 
                    for (var x in words) {  
                        if (words[x]=="NOT" || words[x]=="DON'T") {
                        
                        }                
                        else {
                            querySnapshot.forEach(function(doc) {                                                             
                                if (words[x]==doc.id.toUpperCase()) {                        
                                    if (negative>0) {
                                    
                                    }
                                    else {
                                    
                                    }
                                }
                            });
                        }
                    }
                });
                db.collection("scaredUserIsAnxious").where("ranking", "==", 1)
                .get()
                .then(function(querySnapshot) {
                    negative = 0; 
                    for (var x in words) {  
                        if (words[x]=="NOT" || words[x]=="DON'T") {
                        
                        }                
                        else {
                            querySnapshot.forEach(function(doc) {                                                             
                                if (words[x]==doc.id.toUpperCase()) {                        
                                    if (negative>0) {
                                    
                                    }
                                    else {
                                    
                                    }
                                }
                            });
                        }
                    }
                });
                db.collection("scaredUserHasPanicAttack").where("ranking", "==", 1)
                .get()
                .then(function(querySnapshot) {
                    negative = 0; 
                    for (var x in words) {  
                        if (words[x]=="NOT" || words[x]=="DON'T") {
                        
                        }                
                        else {
                            querySnapshot.forEach(function(doc) {                                                             
                                if (words[x]==doc.id.toUpperCase()) {                        
                                    if (negative>0) {
                                    
                                    }
                                    else {
                                    
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });