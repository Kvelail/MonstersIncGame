/* DOM Selectors */
const cards = document.querySelectorAll('.card'),
      startBtn = document.querySelector('#start-btn'),
      time = document.querySelector('#time span'),
      message = document.querySelector('#message'),
      numberCounterEl = document.querySelector('#number-counter'),
      monsterCounterEl = document.querySelector('.monster-counter-inner'),
      finishBtn = document.querySelector('#finish-btn');

/* Globals */
let isPlaying = false,
    timeInterval,
    numberCounter = 0,
    finalScore = 0,
    finalTime = '';


/* Helpers */
const handleEndGame = () => {

    // Disable All Cards
    cards.forEach(card => {
        card.style.pointerEvents = 'none';
    });
    // Update Start Button
    startBtn.innerText = 'Restart';
    startBtn.disabled = false;
    // Stop Time
    clearInterval(timeInterval);
    // Update Final Variables
    finalScore = numberCounter;
    finalTime = time.textContent;
    // Update Local Storage
    const totalScore = {
        score : finalScore,
        time : finalTime
    };
    localStorage.setItem('mostRecentScore', JSON.stringify(totalScore));
    // Reset Counters
    numberCounter = 0;
    // Enable Finish Button
    finishBtn.disabled = false;

};

function handleCards() {
   
    const back = this.querySelector('.back img');

    if (back.alt == 'sock.svg') {
        // Update Message
        message.textContent = 'GAME OVER !!!'
        message.style.display = 'inline-block';

        handleEndGame();
        
    } else {    
        // Handle Counters
        numberCounter++;
        numberCounterEl.textContent = numberCounter;
        monsterCounterEl.style.width = `${(numberCounter / 11) * 100}%`;
        // Disable Pressed Card
        this.style.pointerEvents = 'none';

        if (numberCounter === 11) {
            message.textContent = 'WIN !!!'
            message.style.display = 'inline-block';

            handleEndGame();
        }
    }

}

const handleTime = () => {

    isPlaying = true;

    let seconds = 0;
    let minutes = 0;

    timeInterval = setInterval(() => {
        seconds++;
        time.textContent = `${minutes}m ${seconds}s`;

        if(seconds >= 60) {
            minutes++;
            seconds = 0;
        }
    }, 1000);

};

const handlemessage = () => {

    isPlaying = false;

    // Show Message
    message.style.display = 'block';
    // Init Message Index
    let messageIndex = 3;
    // Set Interval
    const messageInterval = setInterval(() => {

        message.textContent = messageIndex;
        messageIndex--;

        if (messageIndex === -1) {
            message.textContent = 'GO!';
            messageIndex = 3;
            
            setTimeout(() => {
                // Clear Interval
                clearInterval(messageInterval);
                // Reset Message
                message.style.display = 'none';
                message.textContent = messageIndex;
                // Start Timer
                handleTime();
                if(isPlaying) {
                    cards.forEach(card => {
                        card.style.pointerEvents = 'auto';
                        card.addEventListener('click', handleCards);
                    })
                }
            }, 800);
        }
        
    }, 1000);

};

/* Event Handlers */
const startGame = () => {

    // Reset Fields
    time.textContent = '0m 0s';
    numberCounterEl.textContent = numberCounter;
    monsterCounterEl.style.width = 0;
    loadMonsters();

    // Reset Final Variables
    finalScore = 0;
    finalTime = '0m 0s';

    // Handle Message
    handlemessage();

    // Disable Start Button
    startBtn.disabled = true;

};

const loadMonsters = () => {

    // Monsters.svg Array
    const monsters = [
        'sock.svg',
        'monster1.svg',
        'monster2.svg',
        'monster3.svg',
        'monster4.svg',
        'monster5.svg',
        'monster6.svg',
        'monster7.svg',
        'monster8.svg',
        'monster9.svg',
        'monster10.svg',
        'monster11.svg'
    ];

    cards.forEach(card => {

        // Remove Change Class
        card.classList.remove('change');

        // Select Card Back
        const back = card.querySelector('.back img');
        // Get Random Index
        const randomIndex = Math.floor(Math.random() * monsters.length);
        // Update Card Back Source and Alt
        back.src = `../imgs/${monsters[randomIndex]}`;
        back.alt = monsters[randomIndex];
        // Remove Monster From Monsters Array
        monsters.splice(randomIndex, 1);

        // Select Card Front
        const front = card.querySelector('.front img'); 
        // Update Card Front Source and Alt
        front.src = `../imgs/door.svg`;
        front.alt = `door.svg`;

    });

};

/* Event Listeners */
window.addEventListener('DOMContentLoaded', loadMonsters);

startBtn.addEventListener('click', startGame);

cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('change');
    });
});

finishBtn.addEventListener('click', () => {
    window.location.replace('../html/end.html');
}); 


