var api = 'https://us-central1-cs-4800-backend-server.cloudfunctions.net/app';
var QuestionBotMethod = '/userQuestionsBot';
var userFeelsSad = '/userFeelsSad';
var userisMad = '/userIsMad';
var userNullResponse = '/userNullResponse';
var userFeelsNervous = '/userFeelsNervous';

let submitBtn = document.getElementById('submit');
let userInput = document.getElementById('input');

function userQuestionsBot() {
    // basic fetch request
    fetch(api + QuestionBotMethod)
        .then(blob => blob.json())
        .then(data => {
            let userInputElement = document.createElement('p');
            userInputElement.innerHTML = input.value;
            // all this styling stuff let the front end team handle
            // just to make it look more clear
            userInputElement.style.textAlign = "right";
            document.body.appendChild(userInputElement);
            //console.table(data);
            let newElement = document.createElement('p');
            let randomSelect = Math.floor((Math.random() * 3));
            console.log(randomSelect);
            newElement.innerHTML = data[randomSelect];
            newElement.style.textAlign = "left";
            document.body.appendChild(newElement);
            return data;
        })
        .catch(e => {
            console.log(e);
            return e;
        });
}


submitBtn.addEventListener('click', userQuestionsBot);

/*

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
    
    
// I comment out the parsing code for now 
// we can work on parsing in a cloud function later
    
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
                    var negative = 0;
                    var feelingScores = [0,0,0,0];
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
                        console.log("Happy Score: " + feelingScores[0]);
                    });
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
                        console.log("Anger Score: " + feelingScores[1]);
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
                        console.log("Sad Score: " + feelingScores[2]);                
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
                        console.log("Fear Score: " + feelingScores[3]);
                        console.log("Highest Score: " + findHighestScore(feelingScores)); 
                        feelingChoice = findHighestScore(feelingScores);
                        if (feelingChoice[0]==0) {
                            finalOutput.innerHTML = "I'm not sure what you mean.";
                        }
                        else {
                            switch(feelingChoice[1]) {
                                case 0:
                                    console.log("User is happy.");     
                                    phase = 2;                           
                                    finalOutput.innerHTML = "Why are you happy?";
                                    break;
                                case 1:
                                    console.log("User is angry.");
                                    phase = 3;
                                    finalOutput.innerHTML = "Why are you angry?";
                                    break;
                                case 2:
                                    console.log("User is sad.");
                                    phase = 4;
                                    finalOutput.innerHTML = "Why are you sad?";
                                    break;
                                case 3:
                                    console.log("User is scared.");
                                    phase = 5;
                                    finalOutput.innerHTML = "What makes you so scared?";
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
                var responseScores = [0,0,0];
                db.collection("angryUserHasAngerIssues").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    for (var x in words) {  
                        querySnapshot.forEach(function(doc) {                                                             
                            if (words[x]==doc.id.toUpperCase()) {                        
                                responseScores[0]++;
                            }
                        });
                    }
                });
                db.collection("angryUserIsGrieving").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    for (var x in words) {  
                        querySnapshot.forEach(function(doc) {                                                             
                            if (words[x]==doc.id.toUpperCase()) {                        
                                responseScores[1]++;
                            }
                        });
                    }
                });
                db.collection("angryUserIsFrustrated").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    for (var x in words) {  
                        querySnapshot.forEach(function(doc) {                                                             
                            if (words[x]==doc.id.toUpperCase()) {                        
                                responseScores[2]++;
                            }
                        });
                    }
                    responseChoice = findHighestScore(responseScores);
                    if (responseChoice[0]==0) {
                        finalOutput.innerHTML = "I'm not sure what you mean.";
                    }
                    else {
                        switch(responseChoice[1]) {
                            case 0:
                                console.log("User has anger issues.");
                                finalOutput.innerHTML = "You seem to have anger issues.";
                                break;
                            case 1:
                                console.log("User is grieving.");
                                finalOutput.innerHTML = "You seem to be grieving.";
                                break;
                            case 2:
                                console.log("User is frustrated.");
                                finalOutput.innerHTML = "You seem to be frustrated.";
                                break;
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
                var responseScores = [0,0,0];
                db.collection("sadUserHasNoReason").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    for (var x in words) {  
                        querySnapshot.forEach(function(doc) {                                                             
                            if (words[x]==doc.id.toUpperCase()) {                        
                                responseScores[0]++;
                            }
                        });
                    }
                });
                db.collection("sadUserIsDepressed").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    for (var x in words) {  
                        querySnapshot.forEach(function(doc) {                                                             
                            if (words[x]==doc.id.toUpperCase()) {                        
                                responseScores[1]++;
                            }
                        });
                    }
                });
                db.collection("sadUserIsGrieving").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    for (var x in words) {  
                        querySnapshot.forEach(function(doc) {                                                             
                            if (words[x]==doc.id.toUpperCase()) {                        
                                responseScores[2]++;
                            }
                        });
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
                                console.log("User is depressed.");
                                finalOutput.innerHTML = "You seem to be depressed.";
                                break;
                            case 2:
                                console.log("User is grieving.");
                                finalOutput.innerHTML = "You seem to be grieving.";
                                break;
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
                var responseScores = [0,0,0];
                db.collection("scaredUserHasPanicAttack").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    for (var x in words) {  
                        querySnapshot.forEach(function(doc) {                                                             
                            if (words[x]==doc.id.toUpperCase()) {                        
                                responseScores[0]++;
                            }
                        });
                    }
                });
                db.collection("scaredUserIsAnxious").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    for (var x in words) {  
                        querySnapshot.forEach(function(doc) {                                                             
                            if (words[x]==doc.id.toUpperCase()) {                        
                                responseScores[1]++;
                            }
                        });
                    }
                });
                db.collection("scaredUserIsPhobic").where("ranking", "==", 1)
                    .get()
                    .then(function(querySnapshot) {
                    for (var x in words) {  
                        querySnapshot.forEach(function(doc) {                                                             
                            if (words[x]==doc.id.toUpperCase()) {                        
                                responseScores[2]++;
                            }
                        });
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
                }); 
            }
        }
    });



*/