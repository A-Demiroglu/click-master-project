let score = 0; // Variabele om de huidige score bij te houden (aantal klikken)
let timeLeft = 15; // Starttijd in seconden voor de timer
let clicks = 0; // Variabele om het aantal klikken bij te houden voor CPS-berekening
let timerInterval; // Variabele om het interval van de timer op te slaan
let cpsInterval; // Variabele om het CPS-interval op te slaan
let previousScores = []; // Array om eerdere scores op te slaan
let gameStarted = false; // Variabele om bij te houden of het spel is gestart

// Event listener voor de klikknop
// Dit zorgt ervoor dat er iets gebeurt als de gebruiker op de klikknop drukt
document.getElementById('clickButton').addEventListener('click', function() {
    if (!gameStarted) { // Check of het spel al is gestart
        startGame(); // Start het spel bij de eerste klik
        gameStarted = true; // Zet gameStarted op true om aan te geven dat het spel is begonnen
    }

    if (timeLeft > 0) { // Alleen punten toevoegen als er nog tijd over is
        score++; // Verhoog de score met 1 voor elke klik
        clicks++; // Verhoog het aantal klikken met 1 voor CPS-berekening
        document.getElementById('score').innerText = 'Totale Kliks: ' + score; // Update de score op het scherm
    }
});

// Event listener voor de resetknop
// Dit zorgt ervoor dat het spel opnieuw begint als de gebruiker op reset drukt
document.getElementById('resetButton').addEventListener('click', function() {
    resetGame(); // Roep de resetGame-functie aan
});

// Functie om het spel te starten
function startGame() {
    document.getElementById('timer').innerText = 'Tijd: ' + timeLeft; // Toon de starttijd
    document.getElementById('score').innerText = 'Totale Kliks: ' + score; // Toon de initiële score (0)

    // Start het timerinterval
    timerInterval = setInterval(function() { 
        timeLeft--; // Verminder de tijd met 1 seconde
        document.getElementById('timer').innerText = 'Tijd: ' + timeLeft; // Update de tijd op het scherm

        if (timeLeft <= 0) { // Als de tijd op is
            clearInterval(timerInterval); // Stop de timer
            clearInterval(cpsInterval); // Stop het CPS-interval
            alert('Tijd is om! Je score is: ' + score); // Toon een bericht met de eindscore
            updateScoreboard(score); // Voeg de score toe aan het scorebord
            gameStarted = false; // Zet gameStarted terug op false zodat het spel opnieuw kan starten
        }
    }, 1000); // Herhaal elke seconde (1000 milliseconden)

    // Start het CPS-interval
    cpsInterval = setInterval(function() {
        if (timeLeft < 15) { // Bereken CPS alleen als het spel bezig is
            let cps = clicks / (15 - timeLeft); // Bereken het aantal klikken per seconde (CPS)
            document.getElementById('cps').innerText = 'Clicks per seconde: ' + cps.toFixed(3); // Toon CPS met 3 decimalen
        }
    }, 20); // Herhaal elke 20 milliseconden om de CPS bijna real-time bij te werken
}

// Functie om het spel te resetten
function resetGame() {
    clearInterval(timerInterval); // Stop de timer
    clearInterval(cpsInterval); // Stop het CPS-interval
    score = 0; // Reset de score naar 0
    timeLeft = 15; // Reset de tijd naar de startwaarde (15 seconden)
    clicks = 0; // Reset het aantal klikken
    gameStarted = false; // Zet gameStarted terug op false zodat het spel opnieuw kan starten
    document.getElementById('score').innerText = 'Totale Kliks: ' + score; // Reset de score op het scherm
    document.getElementById('timer').innerText = 'Tijd: ' + timeLeft; // Reset de timer op het scherm
    document.getElementById('cps').innerText = 'Clicks per seconde: 0'; // Reset de CPS op het scherm
}

// Functie om het scorebord bij te werken met de laatste score
function updateScoreboard(newScore) {
    previousScores.push(newScore); // Voeg de nieuwe score toe aan de array van eerdere scores
    document.getElementById('scoreHistory').innerText = previousScores.join(', '); // Toon alle eerdere scores als een lijst
}
