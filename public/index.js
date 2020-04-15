    const submit = document.getElementById("send");
    const finalOutput = document.getElementById("response");
    const userInput = document.getElementById("input");
    
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
    var farewell = ["Good Bye!", "Bye!", "See you later!", "Lets talk again sometime!", "See you soon!", "Farewell!", "Adios!"];
    var interrupted = ["Leaving so soon?", "Awe, we were getting somewhere.", "Already leaving?"];
    var nullResponse = ["I didn't catch that. Can you say that again?", "Did you say something?", "Hello? Are you there?"];

    //All emotions and their keywords
    var happy = ["happy", "joy", "joyful", "cheerful", "chipper", "excited", "relaxed"];
    var angry = ["mad", "anger", "angry", "furious", "agitated", "resentful", "infuriated", "rage", "enraged", "indignant"];
    var sad = ["sad", "blue", "down", "despondent", "discouraged", "gloomy", "sorrow", "sorrowful", "miserable", "unhappy"];
    var fear = ["scared", "fear", "fearful", "anxious", "nervous", "frightened", "terrified"];
    var depression = ["depressed", "downcast", "unmotivated", "uninterested", "disinterested"];
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
        var statement = question.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        var words = statement.split(" ");
        console.log("Current phase is " + phase);
        if (phase==0) {
            finalOutput.innerHTML = "Oh, you have something else to say?";
            phase = 1;
        }
        else if (question.length==0 || question==null) {
            randomRank = Math.floor((Math.random() * nullResponse.length));
            console.log("Empty input.");
            finalOutput.innerHTML = nullResponse[randomRank];
        }
        else if (question.search("Hello")>-1 || question.search("Hi")>-1) {
            randomRank = Math.floor((Math.random() * greet.length-1));
            finalOutput.innerHTML = greet[randomRank];
        }
        else if (question.search("Good-Bye")>-1 || question.search("Bye")>-1 || question.search("See you later")>-1) {
            if (phase!=1) {
                randomRank = Math.floor((Math.random() * interrupted.length-1));
                finalOutput.innerHTML = interrupted[randomRank];
                phase = 0;
            }
            else {
                randomRank = Math.floor((Math.random() * farewell.length-1));
                finalOutput.innerHTML = farewell[randomRank];
                phase = 0;
            }
        }
        else if (phase==1) {           
            var feelingChoice;                
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
                            phase = 0;
                            break;
                        case 1:
                            console.log("User is grieving.");
                            finalOutput.innerHTML = "You seem to be grieving.";
                            phase = 0;
                            break;
                        case 2:
                            console.log("User has anger issues.");
                            finalOutput.innerHTML = "You seem to have anger issues.";
                            phase = 0;
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
                            phase = 0;
                            break;
                        case 1:
                            phase = 6;
                            console.log("User is depressed.");
                            finalOutput.innerHTML = "Your sadness might actually be depression. Can you describe the circumstances surrounding your depression?";
                            phase = 0;
                            break;
                        case 2:
                            console.log("User is grieving.");
                            finalOutput.innerHTML = "You seem to be grieving.";
                            phase = 0;
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
                            phase = 0;
                            break;
                        case 1:
                            console.log("User is anxious.");
                            finalOutput.innerHTML = "You seem to be anxious.";
                            phase = 0;
                            break;
                        case 2:
                            console.log("User has a phobia.");
                            finalOutput.innerHTML = "You seem to have a phobia.";
                            phase = 0;
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
                            phase = 0;
                            break;
                        case 1:
                            console.log("User family has history of depression.");
                            finalOutput.innerHTML = "Depression may run in your family. It might be best to seek medical help.";
                            phase = 0;
                            break;
                        case 2:
                            console.log("User abuses drugs");
                            finalOutput.innerHTML = "Your depression may be linked to your drug use. Thirty-percent of drug users experience depression. It might be best to stop use until you recover from your depression.";
                            phase = 0;
                            break;
                    }
                } 
            }
        }
    });