// Setting up game area
var canvas = document.getElementById("gameArea");
var ctx = canvas.getContext("2d");

// Game Objects
var mole = {
    baseSpeed: 1,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    sizeX: 50,
    sizeY: 50,
    surfaceTime: 0,
    surfaceTimeCounter: 0
};

var burrow = {
    baseSpeed: 1,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    sizeX: mole.sizeX * 1.5,
    sizeY: mole.sizeY * 1.5,
    burrowedTime: 0,
    burrowedTimeCounter: 0,
    burrowMinDuration: 30,
    burrowMaxDuration: 0,
    directionX: 1,
    directionY: 1
};

var mouseClick = {
    x: 0,
    y: 0
};

// Setting up Objects
const FONT_NAME = "VT323";
const DECREMENT_TIME = 1;
const MAX_BURROW_TRAVEL_SPEED = 5;
const MIN_BURROW_TIME = 40;
var burrowIcon = new Image('images/burrow.png');
var deadAudio = new Audio('sounds/dead.wav');
var menuAudio = new Audio('sounds/ping.mp3');
var gameStarted = false;
var isPaused = false;
var warningStarted = false;
var isBackgroundOn = false;
var theMole = document.getElementById("mole");
var score;
var isBurrowed;
var timeLeft;
var startCountdown;
var timeWarning;
var timerColor;
var bgColor;
var counter = 1;
var isCounterInc = true;
ctx.font = '30pt VT323';
burrowIcon.src = 'images/burrow.png';
deadAudio.loop = false;
menuAudio.loop = false;
restart();

// Game logic
function restart() {
    gameStarted = false;
    mole.baseSpeed = 1;
    mole.x = (canvas.width - mole.sizeX) / 2;
    mole.y = (canvas.height - mole.sizeY) / 2;
    mole.dx = mole.baseSpeed;
    mole.dy = mole.baseSpeed;
    mole.surfaceTime = 50;
    mole.surfaceTimeCounter = 0;
    burrow.baseSpeed = 1;
    burrow.x = mole.x;
    burrow.y = mole.y;
    burrow.dx = burrow.baseSpeed;
    burrow.dy = burrow.baseSpeed;
    burrow.burrowTime = 30;
    burrow.burrowTimeCounter = 0;
    burrow.burrowMaxDuration = 200;
    score = 0;
    isBurrowed = false;
    stopCountdown();
    timeLeft = 60;
    stopWarning();
    timerColor = "white";
    bgColor = "white";
    warningStarted = false;
    isPaused = false;
}

function drawMole() {
    theMole.style = "margin-left: " + mole.x + "px; margin-top: " + mole.y + "px;";
}

function drawBurrow() {
    ctx.drawImage(burrowIcon, mole.x, mole.y, burrow.sizeX, burrow.sizeY);
    theMole.style = "display: none;";
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 20, 40);
}

function drawTime(color) {
    ctx.fillStyle = timerColor;
    ctx.fillText("Time: " + timeLeft, 220, 40);
}

function drawBackground() {
    ctx.fillStyle = bgColor;
    ctx.fillText("Bg:" + (isBackgroundOn ? "Y" : "N"), 420, 40); 
}

function drawPause() {
    ctx.fillStyle = "white";
    ctx.fillText("Pause", 540, 40);
}

function drawResetGame() {
    ctx.fillStyle = "white";
    ctx.fillText("Reset Game", 680, 40);
}

function drawResetSpeed() {
    ctx.fillText("Reset Speed", 890, 40);
}

function drawControls() {
    drawScore();
    drawTime();
    drawBackground();
    drawPause();
    drawResetGame();
    drawResetSpeed();
}

function getMouseClickXY(e) {
    var boundingRect = canvas.getBoundingClientRect();
    mouseClick.x = event.clientX - boundingRect.x;
    mouseClick.y = event.clientY - boundingRect.y;
}

function resetMoleTimer() {
    mole.surfaceTimeCounter = 0;
}

function resetBurrowTimer() {
    burrow.burrowTimeCounter = 0;
}

function resetTimers() {
    burrow.burrowTimeCounter = 0;
    mole.surfaceTimeCounter = 0;
}

function continueCountdown() {
    startCountdown = setInterval(function () { timeLeft -= 1; }, 1000);
}

function stopCountdown() {
    clearInterval(startCountdown);
}

function startWarning() {
    timeWarning = setInterval(function () { timerColor == "white" ? timerColor = "red" : timerColor = "white"; }, 500);
}

function stopWarning() {
    clearInterval(timeWarning);
}

function setBurrowDuration(duration) {
    burrow.burrowTime = duration;
}

function checkClick(e) {
    getMouseClickXY(e);
    checkSmash();
    checkBgClick();
    checkPauseClick();
    checkResetGameClick();
    checkResetSpeedClick();
}

function checkBgClick() {
    var background = document.getElementsByClassName("gameContainer");
   
    if (mouseClick.x > 420 && mouseClick.x < 490 && mouseClick.y > 14 && mouseClick.y < 44) {
        resetAudio(menuAudio);
        if (!isBackgroundOn) {
            background[0].style = "background-image: url(images/canvasbackground.jpg);";
            isBackgroundOn = true;
            ctx.clearRect(420, 14, 70, 30);
            drawBackground();
        }
        else {
            background[0].style = "background-image: none;";
            isBackgroundOn = false;
            ctx.clearRect(420, 14, 70, 30);
            drawBackground();
        }
    }
}

function checkPauseClick() {
    
    if (mouseClick.x > 540 && mouseClick.x < 640 && mouseClick.y > 14 && mouseClick.y < 44) {
        if (!isPaused && gameStarted) {
            resetAudio(menuAudio);
            isPaused = true;
            gameStarted = false;
            ctx.fillStyle = "white";
            ctx.fillText("Game Paused", (canvas.width - 180) / 2, canvas.height / 2);
            stopCountdown();
        }
        else if (score > 0) {
            resetAudio(menuAudio);
            isPaused = false;
            gameStarted = true;
            continueCountdown();
        }
    }
}

function checkResetGameClick() {
    
    if (mouseClick.x > 680 && mouseClick.x < 845 && mouseClick.y > 14 && mouseClick.y < 44) {
        resetAudio(menuAudio);
        restart();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMole();
        drawControls();
    }
}

function checkResetSpeedClick() {
    
    if (mouseClick.x > 890 && mouseClick.x < 1070 && mouseClick.y > 14 && mouseClick.y < 44) {
        resetAudio(menuAudio);
        mole.dx = mole.baseSpeed;
        mole.dy = mole.baseSpeed;
        mole.surfaceTime = 50;
        mole.surfaceTimeCounter = 0;
        burrow.baseSpeed = 1;
        burrow.dx = burrow.baseSpeed;
        burrow.dy = burrow.baseSpeed;
        burrow.burrowTime = 30;
        burrow.burrowTimeCounter = 0;
        burrow.burrowMaxDuration = 200;
        timeDelay = 0;
    }
}

function checkSmash() {   
    if (mouseClick.x > mole.x && mouseClick.x < mole.x + mole.sizeX && mouseClick.y > mole.y && mouseClick.y < mole.y + mole.sizeY && !isBurrowed && !isPaused) {
        score++;
        timeLeft += 5;
        if (mole.surfaceTime > DECREMENT_TIME + 1) {
            mole.surfaceTime -= DECREMENT_TIME;
        }
        if (burrow.dx < MAX_BURROW_TRAVEL_SPEED) {
            burrow.baseSpeed += 0.1;
            //burrow.dx > 0 ? burrow.dx += 0.5 : burrow.dx -= 0.5;
            //burrow.dy > 0 ? burrow.dy += 0.5 : burrow.dy -= 0.5;
        }
        if (burrow.burrowMaxDuration > burrow.burrowMinDuration + 1) {
            burrow.burrowMaxDuration -= 2;
        }
        isBurrowed = true;
        randomizeBurrowDirection();
        deadAudio.play();
        resetMoleTimer();
        if (!gameStarted) {
            gameStarted = true;
            continueCountdown();
        }
    }
}

function resetAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

function MoleSurfaced() {
    if (!isBurrowed) {
        mole.surfaceTimeCounter++;
        if (mole.surfaceTimeCounter == mole.surfaceTime) {
            randomizeBurrowDirection();
            isBurrowed = true;
            setBurrowDuration(rand(burrow.burrowMinDuration, burrow.burrowMaxDuration));
            resetTimers();
        }
    }
    else {
        burrow.burrowTimeCounter++;
        if (burrow.burrowTimeCounter == burrow.burrowTime) {
            isBurrowed = false;
            resetTimers();
        }
    }
    
}

function detectCollision() {
    // burrow left or right of screen
    if (burrow.x + burrow.dx > canvas.width - burrow.sizeX || burrow.x + burrow.dx < 0) {
        burrow.dx = -burrow.dx;
        burrow.directionX == 1 ? burrow.directionX = 2 : burrow.directionX = 1;
    }
    // burrow hits top or bottom of screen
    else if (burrow.y + burrow.dy < 50 || burrow.y + burrow.dy > canvas.height - burrow.sizeY) {
        burrow.dy = -burrow.dy;
        burrow.directionY == 1 ? burrow.directionY = 2 : burrow.directionY = 1;
    }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeBurrowDirection() {
    burrow.directionX = rand(1, 2);
    burrow.directionY = rand(1, 2);
}

function setBurrowXY() {
    if (counter >= 1 && counter <= 3 && isCounterInc) {
        burrow.dx = burrow.baseSpeed * counter * Math.cos(counter);
        burrow.dy = burrow.baseSpeed * counter * Math.sin(counter);       
        counter += .02;
    }
    else if (counter < 1) {
        counter += .02;
        isCounterInc = true;
    }
    else if (counter > 3 || !isCounterInc) {
        burrow.dx = burrow.baseSpeed * counter * Math.cos(counter);
        burrow.dy = burrow.baseSpeed * counter * Math.sin(counter);
        counter -= .02;
        isCounterInc = false;
    }
    
    if (burrow.directionX == 1) {
        burrow.dx = Math.abs(burrow.dx);
    }
    else {
        burrow.dx = -Math.abs(burrow.dx);
    }
    if (burrow.directionY == 1) {
        burrow.dy = Math.abs(burrow.dy);
    }
    else {
        burrow.dy = -Math.abs(burrow.dy);
    }
}

function checkTimeLeft() {
    if (timeLeft <= 0) {
        gameOver();
        stopCountdown();
    }
    else if (timeLeft < 10 && !warningStarted) {
        startWarning();
        warningStarted = true;
    }
}

function gameOver() {
    alert("GAME OVER!");   
    restart();
}


function addEventHandlers() {
    canvas.addEventListener('click', checkClick, false);
    theMole.addEventListener('click', checkClick, false);
}

function setUpPage() {
    addEventHandlers();
    document.fonts.load('30pt "VT323"').then(drawScore);
    document.fonts.load('30pt "VT323"').then(drawTime);
    document.fonts.load('30pt "VT323"').then(drawBackground);
    document.fonts.load('30pt "VT323"').then(drawPause);
    document.fonts.load('30pt "VT323"').then(drawResetGame);
    document.fonts.load('30pt "VT323"').then(drawResetSpeed);
    canvas.onload = drawMole();
}

// Main
setUpPage();
requestAnimationFrame(draw);

function draw(timestamp) {
    if (gameStarted) {
        checkTimeLeft();
        MoleSurfaced();        
        ctx.clearRect(0, 0, canvas.width, canvas.height);  
        drawControls();
        if (isBurrowed) {
            drawBurrow();            
            setBurrowXY();
            detectCollision();
            burrow.x += burrow.dx;
            burrow.y += burrow.dy;
            mole.x = burrow.x;
            mole.y = burrow.y;
        }
        else {
            drawMole();
        }   
    }
    requestAnimationFrame(draw);
}

