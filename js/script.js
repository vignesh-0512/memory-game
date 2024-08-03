let score = 0;
const scoreDisplay = document.getElementById('score');
const board = document.getElementById('game-board');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const cardValues = [];
const cards = [];
let flippedCards = [];
let matchedPairs = 0;

function updateScore(points){
    score+=points;
    scoreDisplay.textContent = `Your score:${score}`;
}
function showAllCards(){
   cards.forEach(card=>{
    card.textContent = card.dataset.value;
    card.classList.add('flipped');
   });
   setTimeout(hideAllCards,2000);
}

function hideAllCards(){
    cards.forEach(card=>{
       card.textContent = '';
       card.classList.remove('flipped');
    });
}

window.addEventListener('load',showAllCards);
for(let i=0; i<8; i++){
    const letter = alphabet[Math.floor(Math.random()*alphabet.length)];
    cardValues.push(letter,letter);
}

cardValues.sort(()=> Math.random()-0.5);

cardValues.forEach((values, index)=>{
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = values;
    card.addEventListener('click', flipCard);
    board.appendChild(card);
    cards.push(card);
});

function flipCard(){
    if(flippedCards.length === 2) return;
    const card = this;
    card.textContent = card.dataset.value;
    card.classList.add('flipped');
    flippedCards.push(card);

    if(flippedCards.length === 2){
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch(){
    const [card1, card2] = flippedCards;
    if(card1.dataset.value === card2.dataset.value){
        updateScore(10);
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs+=1;

    }else{
        updateScore(-5);
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];

    if(matchedPairs === 8){
        setTimeout(()=>alert(`Congradulations you have passed your score ${score}`));
    }
}


