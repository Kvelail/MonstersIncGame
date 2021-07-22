/* DOM Selectors */
const scores = document.querySelector('#scores'),
      highScores = JSON.parse(localStorage.getItem('highScores')) || [];

/* Event Listeners */
window.addEventListener('DOMContentLoaded', () => {

    const html = highScores.map(score => {
        return `<li><span class="end-color">${score.name}</span> - ${score.score}/<span class="end-color">11</span> - ${score.time}</li>`;
    }).join('');
    
    scores.innerHTML = html;

});