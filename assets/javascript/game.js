
var teams = ['browns', 'vikings', 'texans', 'crew', 'wild','thunder'];

var guessedLetter=[];
var wordIndex;
var currentWord=[];
const maxTries = 8;
var start = false;
var finished = false;
var guessesLeft = 0;
var wins = 0;




function resetGame() {
    guessesLeft = maxTries;
    start = false;

   
    wordIndex = Math.floor(Math.random() * (teams.length));

    guessedLetter = [];
    currentWord = [];


    for (var i = 0; i < teams[wordIndex].length; i++) {
    currentWord.push("_");
        }
    
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover").style.cssText = "display: none";
    document.getElementById("youwin").style.cssText = "display: none";
    
    
    updateDisplay();
    };

    
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < currentWord.length; i++) {
        document.getElementById("currentWord").innerText += currentWord[i];
    }
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("guessedLetter").innerText = guessedLetter;
    if(guessesLeft <= 0) {
        document.getElementById("gameover").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        finished = true;
    }
};

function makeGuess(letter) {
    if (guessesLeft > 0) {
        if (!start) {
            start = true;
        }

        if (guessedLetter.indexOf(letter) === -1) {
            guessedLetter.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

function evaluateGuess(letter) {
    
    var positions = [];

    for (var i = 0; i < teams[wordIndex].length; i++) {
        if(teams[wordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for(var i = 0; i < positions.length; i++) {
            currentWord[positions[i]] = letter;
        }
    }
};
function checkWin() {
    if(currentWord.indexOf("_") === -1) {
        document.getElementById("youwin").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        finished = true;
    }
};

document.onkeydown = function(event) {
    if(finished) {
        resetGame();
        finished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};