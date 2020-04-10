/*firebase.initializeApp({
  apiKey: 'AIzaSyD_GOu9Qy1FFP0eKKZOE6t4lzAegqHwvvw',
  authDomain: 'cs-4800-backend-server.firebaseapp.com',
  projectId: 'cs-4800-backend-server'
});
/*var api = 'https://us-central1-cs-4800-backend-server.cloudfunctions.net/app';
var QuestionBotMethod = '/userQuestionsBot';
var userFeelsSad = '/userFeelsSad';
var userisMad = '/userIsMad';
var userNullResponse = '/userNullResponse';
var userFeelsNervous = '/userFeelsNervous';


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
submitBtn.addEventListener('click', userQuestionsBot);
*/

    //load queries
	/*
    docRef.get().then(function(doc) {
        if(doc.exists) {
            console.log("Documented data:", doc.data().Woohoo);
        } else {
            console.log("Something went wrong bro");
        }
    }).catch(function(error) {
        console.log(error);
    });
    */


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
    });
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

    var greet = ["Hello!", "Hi", "Greetings!"];
    var nullResponse = ["I didn't catch that. Can you say that again?"];

    //All emotions and their keywords
    var happy = ["happy", "joy", "joyful", "cheerful", "chipper", "excited", "relaxed"];
    var angry = ["mad", "anger", "angry", "furious", "agitated", "resentful", "infuriated", "rage", "enraged", "indignant"];
    var sad = ["sad", "blue", "down", "despondent", "discouraged", "gloomy", "sorrow", "sorrowful", "miserable"];
    var fear = ["scared", "fear", "fearful", "anxious", "nervous", "frightened", "terrified"];
    var depression = ["depressed", "downcast", "unmotivated", "uninterested"];
    var emotions = [happy, angry, sad, fear, depression];

    //Reasons for Anger
    var angryUserIsFrustrated = ["frustrated", "annoyed", "irritated", "jilted", "unsatisfied"];
    var angryUserIsGrieving = ["grieving", "mourning", "lost", "loss", "lament"];
    var angryUserHasAngerIssues = ["always", "constantly", "constant", "often", "usually"];
    var userIsAngry = [angryUserIsFrustrated, angryUserIsGrieving, angryUserHasAngerIssues];

    //Reasons for Sadness
    var sadUserIsDepressed = ["depressed", "unmotivated", "despondent", "discouraged", "downcast", "gloomy", "dejected", "crestfallen"];
    var sadUserIsGrieving = ["grieving", "loss", "lost", "mourning", "lament"];
    var sadUserHasNoReason = ["unsure", "uncertain"];
    var userIsSad = [sadUserHasNoReason, sadUserIsDepressed, sadUserIsGrieving];

    //Reasons for Fear
    var scaredUserHasPanicAttack = ["sudden", "suddenly", "nowhere"];
    var scaredUserIsAnxious = ["anxious", "nervous", "restless", "distressed", "worried", "dread"];
    var scaredUserIsPhobic = ["hate", "scared", "dislike"];
    var userIsScared = [scaredUserHasPanicAttack, scaredUserIsAnxious, scaredUserIsPhobic];

    //Reasons for Depression
    var depressedUserHasPastTrauma = ["loss", "rape", "ptsd", "hurt", "attacked", "assaulted", "abuse", "abused", "hit", "beaten", "beat"];
    var depressedUserInheritedDepression = ["family", "ancestors", "relatives", "uncle", "aunt", "parents", "dad", "father", "mom", "mother", "inherited", "genes", "genetics", ];
    var depressedUserAbusesDrugs = ["drugs", "meth", "methamphetamine", "cocain", "crack", "tobacco", "smoke", "weed", "inject", "snort"];
    var userIsDepressed = [depressedUserHasPastTrauma, depressedUserInheritedDepression, depressedUserAbusesDrugs];
    
    var phase = 1;
    submit.addEventListener("click", function() {
        var question = input.value;
        userInput.innerHTML = input.value;
        var statement = question.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        var words = statement.split(" ");
    
        if (phase==1) {
            if (question.length==0 || question==null) {
                randomRank = Math.floor((Math.random() * nullResponse.length));
                console.log("Empty input.");
                finalOutput.innerHTML = nullResponse[randomRank];
            }
            else {
                var feelingChoice;
                if (question.search("Hello")>-1 || question.search("Hi")>-1) {
                    randomRank = Math.floor((Math.random() * greet.length-1));
                    finalOutput = greet[randomRank];
                }
                else {
                    var negative = 0;
                    var feelingScores = [0,0,0,0,0];
                    for (var e in emotions) { 
                        negative = 0; 
                        for (var w in words) {
                            if (words[w]=="NOT" || words[w]=="DON'T") {
                                negative += 1;
                            }                
                            else {
                                for (var k in emotions[e]) {                                                            
                                    if (words[w]==emotions[e][k].toUpperCase()) {                        
                                        if (negative>0) {
                                            feelingScores[e]--;
                                            negative--;
                                        }
                                        else {
                                            feelingScores[e]++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    feelingChoice = findHighestScore(feelingScores);
                    if (feelingChoice[0]==0) {
                        finalOutput.innerHTML = nullResponse[Math.floor((Math.random() * nullResponse.length-1))];
                    }
                    else {
                        switch(feelingChoice[1]) {
                            case 0: 
                                phase = 2;
                                finalOutput.innerHTML = "Describe your happiness.";
                                break;
                            case 1: 
                                phase = 3;
                                finalOutput.innerHTML = "Describe your anger. What is making you angry?";
                                break;
                            case 2: 
                                phase = 4;
                                finalOutput.innerHTML = "Describe your sadness. What is making you sad?";
                                break;
                            case 3: 
                                phase = 5;
                                finalOutput.innerHTML = "Describe your fear. What is scaring you?";
                                break;
                            case 4:
                                phase = 6;
                                finalOutput.innerHTML = "Depression is serious, but can be fixed. Can you describe the circumstances surrounding your depression?";
                                break;
                        }
                    }
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
                var responseScores = [0,0,0];
                for (var u in userIsAngry) { 
                    negative = 0; 
                    for (var w in words) {               
                        for (var k in userIsAngry[u]) {                                                            
                            if (words[w]==userIsAngry[u][k].toUpperCase()) {                        
                                responseScores[u]++;
                            }
                        }

                    }
                }                
                responseChoice = findHighestScore(responseScores);
                if (responseChoice[0]==0) {
                    finalOutput.innerHTML = "I'm not sure what you mean.";
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User is frustrated.");
                            finalOutput.innerHTML = "You seem to be frustrated.";
                            break;
                        case 1:
                            console.log("User is grieving.");
                            finalOutput.innerHTML = "You seem to be grieving.";
                            break;
                        case 2:
                            console.log("User has anger issues.");
                            finalOutput.innerHTML = "You seem to have anger issues.";
                            break;
                    }
                }
            }
        }
        //Why is user sad?
        else if (phase==4) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT SAD")>-1) {
                phase = 1;
                finalOutput.innerHTML = "Alright then. How do you actually feel?";
            }
            else {
                var responseScores = [0,0,0];
                for (var u in userIsSad) { 
                    negative = 0; 
                    for (var w in words) {               
                        for (var k in userIsSad[u]) {                                                            
                            if (words[w]==userIsSad[u][k].toUpperCase()) {                        
                                responseScores[u]++;
                            }
                        }

                    }
                }
                responseChoice = findHighestScore(responseScores);
                if (responseChoice[0]==0) {
                    finalOutput.innerHTML = "I'm not sure what you mean.";
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User has medical issues.");
                            finalOutput.innerHTML = "You seem to have medical issues.";
                            break;
                        case 1:
                            phase = 6;
                            console.log("User is depressed.");
                            finalOutput.innerHTML = "Your sadness might actually be depression. Can you describe the circumstances surrounding your depression?";
                            break;
                        case 2:
                            console.log("User is grieving.");
                            finalOutput.innerHTML = "You seem to be grieving.";
                            break;
                    }
                } 
            }
        }
        //Why is user scared?
        else if (phase==5) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT SCARED")>-1) {
                phase = 1;
                finalOutput.innerHTML = "Alright then. How do you actually feel?";
            }
            else {
                var responseScores = [0,0,0];
                for (var u in userIsScared) { 
                    negative = 0; 
                    for (var w in words) {               
                        for (var k in userIsScared[u]) {                                                            
                            if (words[w]==userIsScared[u][k].toUpperCase()) {                        
                                responseScores[u]++;
                            }
                        }

                    }
                }
                responseChoice = findHighestScore(responseScores);
                if (responseChoice[0]==0) {
                    finalOutput.innerHTML = "I'm not sure what you mean.";
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User has panic attacks.");
                            finalOutput.innerHTML = "You seem to have panic attacks.";
                            break;
                        case 1:
                            console.log("User is anxious.");
                            finalOutput.innerHTML = "You seem to be anxious.";
                            break;
                        case 2:
                            console.log("User has a phobia.");
                            finalOutput.innerHTML = "You seem to have a phobia.";
                            break;
                    }
                } 
            }
        }
        //Why is user depressed?
        else if (phase==6) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT DEPRESSED")>-1) {
                phase = 1;
                finalOutput.innerHTML = "Alright then. How do you actually feel?";
            }
            else {
                var responseScores = [0,0,0];
                for (var u in userIsDepressed) { 
                    negative = 0; 
                    for (var w in words) {               
                        for (var k in userIsDepressed[u]) {                                                            
                            if (words[w]==userIsDepressed[u][k].toUpperCase()) {                        
                                responseScores[u]++;
                            }
                        }
    
                    }
                }
                responseChoice = findHighestScore(responseScores);
                if (responseChoice[0]==0) {
                    finalOutput.innerHTML = "I'm not sure what you mean.";
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User has past trauma.");
                            finalOutput.innerHTML = "You might have some unresolved past trauma. It might be beneficial to discuss these with a therapist or loved one.";
                            break;
                        case 1:
                            console.log("User family has history of depression.");
                            finalOutput.innerHTML = "Depression may run in your family. It might be best to seek medical help.";
                            break;
                        case 2:
                            console.log("User abuses drugs");
                            finalOutput.innerHTML = "Your depression may be linked to your drug use. Thirty-percent of drug users experience depression. It might be best to stop use until you recover from your depression.";
                            break;
                    }
                } 
            }
        }
    });