
// Instance of Clearblade Object
var cb = new ClearBlade();

var questionNumber = 0;
var score = 0;
var answer = 0;

// Initial Options for Clearblade Connection
var initOptions = {
    messagingPort: 8904,
    useMQTT: true,
    cleanSession: true,
    systemKey: "ba87f5ec0a8cbcd1a3e1e1959ec101",
    systemSecret: "BA87F5EC0AFAB0B6A0D1E0DDCA2C"
};

// Authetnicates Login Information to Clearblade System
var loginEvent = function() {

    var initCallback = function(err, data){
        if(err) {
            showError("loginView","Your authorized login failed.");
        } else {
            showView("loginSuccessView");
        }

    };

    // Clearblade call to Authenticate
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    initOptions.email = email;
    initOptions.password = password;
    initOptions.callback = initCallback;
    cb.init(initOptions);
    
};

// Moves user from succesful login notification page to Quiz
var startEvent = function() {
   score = 0;
   questionNumber = 0;
   queryEvent();
};

// Checks Answer chosen and incrememnts score
var submitEvent = function() {

    var radios = document.getElementsByName('radiogroup');
    for (var i = 0, length = radios.length; i < length; i++) {

        if (radios[i].checked) {
            if (radios[i].value == answer){
                score++;
            }
            break;
        }
    }

    if (questionNumber < 5){
        queryEvent();
    }else{
        var params = {
            name : initOptions.email,
            score : score,
            timestamp : Date.now()
        };
        var callback = function(err, data){
            if (err){
                showError("submit", "Collection does not exist.");
            }else{
                document.getElementById("results").innerHTML = ("Score Saved: " + score + " out of 5.");               
                showView("scoreView");
            }
        }
        cb.Code().execute("updateScores", params, callback);

    }
};

// Simply resets quiz.
var resetEvent = function(){
    score = 0;
    questionNumber = 0;
    showView("loginSuccessView");
}

// Pulls questions down from server and populates html.
var queryEvent = function(){
    var query = cb.Query({collectionName: "questions"});
    query.setPage(0,0);
    query.fetch(function(err, data){
        if (err){
            showError("submit", "Collection does not exist.");
        }else{

            // Pull Questions and choices from CB database
            document.getElementById("questionPrompt").innerHTML = (JSON.stringify(data[questionNumber].data.question));

            document.getElementById("choice1").innerHTML = (JSON.stringify(data[questionNumber].data.choice01));

            document.getElementById("choice2").innerHTML = (JSON.stringify(data[questionNumber].data.choice02));

            document.getElementById("choice3").innerHTML = (JSON.stringify(data[questionNumber].data.choice03));

            // By querying the answer now, we can store it, saving us from making another query later
            // But, now the answer is in the JS file for anyone digging around.
            // Though it could be obfuscated.
            answer = data[questionNumber].data.answer;

            }

            questionNumber++;
            showView("quizView");

        });
};