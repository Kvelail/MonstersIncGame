/* DOM Selectors */
const form = document.querySelector('#end-form'),
      username = document.querySelector('#input-name'),
      saveBtn = document.querySelector('#save-btn'),
      mostRecentScore = JSON.parse(localStorage.getItem('mostRecentScore')) || [],
      result = document.querySelector('#result');

/* Event Listeners */
username.addEventListener('keyup', () => {
    saveBtn.disabled = !username.value;
});

form.addEventListener('submit', e => {

    // Prevent Form From Submitting
    e.preventDefault();

    // Get User Input Value
    const name = username.value;

    // User Object
    const player = {
        name,
        score : mostRecentScore.score,
        time : mostRecentScore.time
    };

    // Update Local Storage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.unshift(player);
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    
    // Relocate
    window.location.replace('/');

});

window.addEventListener('DOMContentLoaded', () => {
    
    // Update Most Recent Score
    const splitTime = mostRecentScore.time.split('');

    const html = `<h3 id="result" class="result">${mostRecentScore.score}/<span class="end-color">11</span> - ${splitTime[0]}<span class="end-color">m</span> ${splitTime[3]}<span class="end-color">s</span></h3>`;
    
    result.innerHTML = html;

});