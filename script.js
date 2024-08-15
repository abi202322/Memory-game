const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');
const playerInfo = document.getElementById('player-info');
const gameContainer = document.getElementById('game-container');
const infoForm = document.getElementById('info-form');

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;
let timer;
let time = 0;
let playerName = '';
let playerAge = '';

// Initialize the game after collecting player info
infoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    playerName = document.getElementById('name').value;
    playerAge = document.getElementById('age').value;
    playerInfo.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    initGame();
});

function initGame() {
    // Create an array of cards (8 pairs for this example)
    const cardValues = [...Array(8).keys()].flatMap(i => [i, i]);
    // Shuffle the card values
    cardValues.sort(() => Math.random() - 0.5);

    // Create the card elements
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = value;
        card.innerHTML = `<img src="icons/${value}.png" alt="Card ${value}">`;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
        cards.push(card);
    });

    // Start the timer
    startTimer();
}

function handleCardClick(event) {
    const card = event.currentTarget;

    if (flippedCards.length === 2 || card.classList.contains('flipped')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        // Cards match
        score += 10;
        matchedPairs += 1;
        messageDisplay.textContent = 'Excellent';
        flippedCards = [];
        scoreDisplay.textContent = score;

        if (matchedPairs === cards.length / 2) {
            // Game over
            clearInterval(timer);
            setTimeout(() => {
                alert(`Game Over!\nName: ${playerName}\nScore: ${score}\nTime: ${timerDisplay.textContent}`);
                // Optionally, restart or end the game
            }, 100);
        }
    } else {
        // Cards don't match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }, 1000);
}
