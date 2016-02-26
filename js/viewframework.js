// Views for Application
var views = {
    loginView: {
        setup: function() {
            setTitleLeft("");
            setTitleCenter("<div class='titleLabel'>ClearBlade Quiz</div>");
            setTitleRight("");
        }
    },
    loginSuccessView: {
        setup: function() {
            setTitleLeft("Back");
            setTitleCenter("<div class='titleLabel'>ClearBlade Quiz</div>");
            setTitleRight("");
            titleLeftClick = function() {
                showView("loginView");
            };
            titleCenterClick = function() {};
        }

    },
    quizView: {
        setup: function() {
            setTitleLeft("Back");
            setTitleCenter("<div class='titleLabel'>ClearBlade Quiz</div>");
            setTitleRight("");
            titleLeftClick = function() {
                showView("loginView");
            };
            titleCenterClick = function() {};
        }

    },
    scoreView: {
        setup: function() {
            setTitleLeft("Back");
            setTitleCenter("<div class='titleLabel'>ClearBlade Quiz</div>");
            setTitleRight("");
            titleLeftClick = function() {
                showView("loginSuccessView");
            };
            titleCenterClick = function() {};
        }
    }
}

var startup = function() {
    showView("loginView");
}