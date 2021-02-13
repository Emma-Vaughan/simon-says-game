var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "yellow", "green", "blue"];

var level = 0;

var started = false;


function nextSequence() {
    randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);  
    $("#" + randomChosenColor).fadeTo(100, 0.3, function () {
        $(this).fadeTo(500, 1.0);
    });  
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    level = level + 1;
    $("h1").text("Level " + level);
}



// Step 3 & 5

function playSound(userChosenColor) {
if (userChosenColor == "red") {
    var audiored = new Audio('sounds/red.mp3');
    audiored.play();
} else if (userChosenColor == "blue") {
    var audioblue = new Audio('sounds/blue.mp3');
    audioblue.play();
} else if (userChosenColor == "yellow") {
    var audioyellow = new Audio('sounds/yellow.mp3');
    audioyellow.play();
} else if (userChosenColor == "green") {
    var audiogreen = new Audio('sounds/green.mp3');
    audiogreen.play();
}
};

// Step 4

$(".btn").on("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


// Step 6

function animatePress(userChosenColor) {
    $("#" + userChosenColor).addClass("pressed");
    setTimeout(function () {
        $("#" + userChosenColor).removeClass("pressed");
    }, 100);
};

// Step 7

$(document).on("keypress", function () {
    if (started === false) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    };
});


// Step 8 

function checkAnswer(level) {
    if (gamePattern[level] === userClickedPattern[level]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        var gameOver = new Audio('sounds/wrong.mp3');
        gameOver.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

