
var colors = ["green", "blue", "yellow", "red"]

var keyPressed = [];
var newPattern = [];
var level = 0;
var started = false;

$(document).keypress( () => {
    if (!started) {
        started = true;   
        $("#level-title").text("Level " + level);
        nextLevel();
    }
})

$(".btn").click(function () {
    var choosenColor = $(this).attr("id");
    keyPressed.push(choosenColor)
    playAudio(choosenColor);
    animate(choosenColor);
    checkAnswer(keyPressed.length-1);
})

checkAnswer = (colorLength) => {
    if(newPattern[colorLength] === keyPressed[colorLength]){
        if(newPattern.length === keyPressed.length){
            setTimeout(()=>{
                nextLevel();
            },1000)
        }
    }else{
        if(started === true){
        playAudio("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");     
        }, 500);
    gameOver();
    }}
}

nextLevel = () => {
    keyPressed = [];
    level++
    $("#level-title").text("Level " + level);     
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = colors[randomNumber];
    newPattern.push(randomColor)
    
    setTimeout(() => {
        playAudio(randomColor);
        $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100)
  }, 100);
}

gameOver = () => {
    newPattern = [];
    level = 0;
    started = false
}
animate = (pressedColor) => {
    $("#" + pressedColor).addClass("pressed");
    setTimeout(function () {
        $("#" + pressedColor).removeClass("pressed");
    }, 100)
}

playAudio = (color) => {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}
