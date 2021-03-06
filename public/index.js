    const userInput = $('#input');
    
    //Finds highest score in list of emotion scores. Returns array: [highest-score, index-of-score];
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
    
    var greet = ["Hello!", "Hi!", "Greetings!", "Hola!", "Good day to you!", " Hey, how are you?"];
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
    
    /* submit onClick button */
    $('#send').click( () => {
        therabot();
    });
    
    /* Keyboard shortcut ENTER */
    $('#input').keypress((e)=> {
        if(e.keyCode == 13 || e.which == 13){
            therabot();
        }
    });
    
    var phase = 1;
    function therabot() {
        var question = input.value;
        var statement = question.toUpperCase().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        var words = statement.split(" ");
        console.log(words);       
        if (phase==0) {
            $('#response').text("Oh, you have something else to say?");
            phase = 1;
        }
        else if (words.length==0) {
            randomRank = Math.floor((Math.random() * nullResponse.length));
            console.log("Empty input.");
            $('#response').text(nullResponse[randomRank]);
        }
        else if (words.includes("HELLO") || words.includes("HI")) {
            console.log("User greeted bot.");
            randomRank = Math.floor((Math.random() * greet.length));
            console.log(greet[randomRank]);
            $('#response').text(greet[randomRank]);
        }
        else if (words.includes("GOODBYE") || words.includes("BYE") || words.includes("FAREWELL") || question.search("See you later")>-1) {
            console.log("User says farewell.");
            if (phase!=1) {
                randomRank = Math.floor((Math.random() * interrupted.length));
                console.log(interrupted[randomRank]);
                $('#response').text(interrupted[randomRank]);
            }
            else {
                randomRank = Math.floor((Math.random() * farewell.length));
                console.log(farewell[randomRank]);
                $('#response').text(farewell[randomRank]);
            }
            phase = 0;
        }
        else if (phase==1) {           
            var feelingChoice;                
            var negative = 0;
            var feelingScores = [0,0,0,0,0];
            for (var w in words) {
                if (words[w]=="NOT" || words[w]=="DON'T") {
                    negative += 1;
                }
                else {
                    for (var e in emotions) {
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
            console.log(feelingScores);
            console.log(feelingChoice);
            if (feelingChoice[0]==0) {
                $('#response').text("I'm not sure what you mean. Can you rephrase that?");
            }
            else {
                switch(feelingChoice[1]) {
                    case 0: 
                        phase = 2;
                        $('#response').text("Describe your happiness.");
                        break;
                    case 1: 
                        phase = 3;
                        $('#response').text("Describe your anger. What is making you angry?");
                        break;
                    case 2: 
                        phase = 4;
                        $('#response').text("Describe your sadness. What is making you sad?");
                        break;
                    case 3: 
                        phase = 5;
                        $('#response').text("Describe your fear. What is scaring you?");
                        break;
                    case 4:
                        phase = 6;
                        $('#response').text("Depression is serious, but can be fixed. Can you describe the circustances surrounding your depression?");
                        break;
                }
            }    
        }
        //Why is user happy?
        else if (phase==2) {
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT HAPPY")>-1) {
                phase = 1;
                $('#response').text("That's too bad. How do you actually feel?");
            }
            else {
                phase = 1;
                $('#response').text("I am glad you feel this way!");
            }
        }
        //Why is user angry?
        else if (phase==3) {            
            if (statement.search("JUST KIDDING")>-1 || statement.search("NOT ANGRY")>-1) {
                phase = 1;
                $('#response').text("Alright then. How do you actually feel?");
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
                    $('#response').text("I'm not sure what you mean. Can you rephrase your explanation?");
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User is frustrated.");
                            $('#response').text("Frustration is normal to experience. Maybe take a break. Either to assess the situation or to get away.");
                            phase = 0;
                            break;
                        case 1:
                            console.log("User is grieving.");
                            $('#response').text("I am sorry for your loss. Dealing with grief is not easy, but you don't have to do so alone. Maybe talk with someone you trust about your feelings? Or perhaps it would be better to take you mind off if by being productive!");
                            phase = 0;
                            break;
                        case 2:
                            console.log("User has anger issues.");
                            $('#response').text("Anger issues can be very disruptive. The best way to deal with it is to own up to it and identify ways to calm yourself.");
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
                $('#response').text("Alright then. How do you actually feel?");
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
                    $('#response').text("I'm not sure what you mean. Can you rephrase your explanation?");
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User has medical issues.");
                            $('#response').text("You seem to have medical issues. Consider going to a doctor for some medication.");
                            phase = 0;
                            break;
                        case 1:
                            phase = 6;
                            console.log("User is depressed.");
                            $('#response').text("Your sadness might actually be depression. Can you describe the circumstances surrounding your depression?");
                            break;
                        case 2:
                            console.log("User is grieving.");
                            $('#response').text("I am sorry for your loss. Dealing with grief is not easy, but you don't have to do so alone. Maybe talk with someone you trust about your feelings? Or perhaps it would be better to take you mind off if by being productive!");
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
                $('#response').text("Alright then. How do you actually feel?");
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
                    $('#response').text("I'm not sure what you mean. Can you rephrase your explanation?");
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User has panic attacks.");
                            $('#response').text("It seems like you're having panic attacks. They can be hard to deal with, but there are techniques to do so, such as deep breathing and other exercises.");
                            phase = 0;
                            break;
                        case 1:
                            console.log("User is anxious.");
                            $('#response').text("Anxiety is a common issue. The best way to deal with it is to identify what is making you anxious and putting it to words. From there you can figure out how to deal with it specifically.");
                            phase = 0;
                            break;
                        case 2:
                            console.log("User has a phobia.");
                            $('#response').text("You seem to have a phobia. It is important to control your thoughts and emotions when encountering your phobia, so that you don't find yourself in a bad place.");
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
                $('#response').text("Alright then. How do you actually feel?");
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
                    $('#response').text("I'm not sure what you mean. Can you rephrase your explanation?");
                }
                else {
                    switch(responseChoice[1]) {
                        case 0:
                            console.log("User has past trauma.");
                            $('#response').text("You might have some unresolved past trauma. It might be beneficial to discuss these with a therapist or loved one.");
                            phase = 0;
                            break;
                        case 1:
                            console.log("User family has history of depression.");
                            $('#response').text("Depression may run in your family. It might be best to seek medical help.");
                            phase = 0;
                            break;
                        case 2:
                            console.log("User abuses drugs");
                            $('#response').text("Your depression may be linked to your drug use. Thirty-percent of drug users experience depression. It might be best to stop use until you recover from your depression.");
                            phase = 0;
                            break;
                    }
                } 
            }
        }
        console.log("Current phase is " + phase);
    };