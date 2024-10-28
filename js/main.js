let score = 0;

document.getElementById('clickButton').addEventListener('click', function () {
    score++;
    document.getElementById('score').innerText = 'Totale Kliks: ' + score;
});
document.getElementById('resetButton').addEventListener('click', function () {
    resetGame();
});

function resetGame() {
    score = 0;
    document.getElementById('score').innerText = 'Totale Kliks: ' + score;
}

let timeLeft = 15;
let timerInterval;

function startGame() {
    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').innerText = 'Tijd: ' + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Tijd is om! Je score is: ' + score);
        }
    }, 1000);
}