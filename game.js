var gamePattern = [] 
var userClickedPattern = [];

var buttons = ["red","blue","green","yellow"];

var level = 0;
var started = false;

$(document).keydown(function(event){
    if(!started && event.key == " "){
        setTimeout(function(){
            $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        },500);       
    }
})

function nextSequence() {
    userClickedPattern = []; 

    var randomNum = Math.floor(Math.random()*4);
    var randomButton = buttons[randomNum];
    gamePattern.push(randomButton);

    $("#" + randomButton).fadeIn(250).fadeOut(250).fadeIn(250);
    playSound(randomButton);
 
    level++;
    $("h1").text("Level " + level);
}

$(".btn").click(function(){

    //? 2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
    
    //! this here is applied on the click and gives us the id of the class which it is applied on
    
        playSound(userChosenColour);
        animatePress(userChosenColour);
    
        checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(curretLevel) {
    if(gamePattern[curretLevel] === userClickedPattern[curretLevel]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }else{
        startover();
        $("h1").text("Game-Over Press SpaceBar to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name+".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+ color).addClass("pressed")
//? Adding a setTimeout to remove class pressed after a  
    setTimeout(function() {
        $("#"+ color).removeClass("pressed");
    }, 100)
}

//? Resets the Stats
function startover() {
    level = 0;
    gamePattern = [];
    started = false;
}