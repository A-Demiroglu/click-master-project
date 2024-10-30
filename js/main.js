let score = 0;
let timeLeft = 15;
let clicks = 0;
let timerInterval;
let cpsInterval;
let previousScores = [];
let gameStarted = false; // Houdt bij of het spel is gestart

// Event listener voor wanneer de klikknop wordt ingedrukt
document.getElementById('clickButton').addEventListener('click', function() {
    if (!gameStarted) {
        startGame(); // Start de game pas bij de eerste klik
        gameStarted = true;
    }

    if (timeLeft > 0) {
        score++;
        clicks++;
        document.getElementById('score').innerText = 'Totale Kliks: ' + score;
    }
});

document.getElementById('resetButton').addEventListener('click', function() {
    resetGame();
});

function startGame() {
    document.getElementById('timer').innerText = 'Tijd: ' + timeLeft;
    document.getElementById('score').innerText = 'Totale Kliks: ' + score;

    // Start het timerinterval
    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').innerText = 'Tijd: ' + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(cpsInterval);
            alert('Tijd is om! Je score is: ' + score);
            updateScoreboard(score);
            gameStarted = false; // Reset game status na einde
        }
    }, 1000);

    // Start het CPS-interval
    cpsInterval = setInterval(function() {
        if (timeLeft < 15) {
            let cps = clicks / (15 - timeLeft);
            document.getElementById('cps').innerText = 'Clicks per seconde: ' + cps.toFixed(3);
        }
    }, 20);
}

function resetGame() {
    clearInterval(timerInterval);
    clearInterval(cpsInterval);
    score = 0;
    timeLeft = 15;
    clicks = 0;
    gameStarted = false; // Reset game status
    document.getElementById('score').innerText = 'Totale Kliks: ' + score;
    document.getElementById('timer').innerText = 'Tijd: ' + timeLeft;
    document.getElementById('cps').innerText = 'Clicks per seconde: 0';
}

function updateScoreboard(newScore) {
    previousScores.push(newScore);
    document.getElementById('scoreHistory').innerText = previousScores.join(', ');
}
