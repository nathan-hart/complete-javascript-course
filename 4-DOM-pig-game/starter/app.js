/* Notes:
Every element in HTML is an object in the DOM.  JS interacts with elements in the DOM. */

/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, prevRoll;
var winningScoreValue = document.querySelector(".winScore").value;

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector(`.dice1`).style.display = "none";
  document.querySelector(`.dice2`).style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(`#name-0`).textContent = "Player 1";
  document.querySelector(`#name-1`).textContent = "Player 2";
  gamePlaying = true;
  // if (winningScoreValue.length === 0) {
  //   winningScoreValue = 20
  // } else {
  //   winningScore = winningScoreValue
  // }
}

init();

//Message queue in JS engine: queue of events that are only processed AFTER execution stack is empty.
// State definition: Condition of a system
// Anonymous function - no name so it cannot be called again/outside of context where it is called.

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Random Number Generation
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // var dice = 6;
    // 2. Display result
    var diceDom1 = document.querySelector(`.dice1`);
    var diceDom2 = document.querySelector(`.dice2`);
    diceDom1.style.display = "block";
    diceDom2.style.display = "block";
    diceDom1.src = `dice-${dice1}.png`; //setter - sets the value
    diceDom2.src = `dice-${dice2}.png`; //setter - sets the value
    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice2 + dice1;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    }
    // 3.  Update rounded score if rolled number !== 1
    /* //Challenge 2 if (dice1 !== 1 && prevRoll + dice !== 12) {
      // add score
      roundScore += dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore; // setter
      prevRoll = dice;
    }
    else if (prevRoll + dice === 12) {
      roundScore = 0;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = roundScore;
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent =
        scores[activePlayer];
      nextPlayer();
      prevRoll = 0;
    }
    else {
      nextPlayer();
      prevRoll = 0;

    } */
    // prevRoll = dice;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Add current score to global score
    scores[activePlayer] += roundScore;
    // 2. Update UI
    document.querySelector(`#score-${activePlayer}`).textContent =
      scores[activePlayer];
    // 3. Check if player won game
    var winningScore;
    var input = document.querySelector(".winScore").value;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    if (scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = "Winner!";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add("winner");
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // 4. Next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(`.player-0-panel`).classList.toggle("active");
  document.querySelector(`.player-1-panel`).classList.toggle("active");
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);
