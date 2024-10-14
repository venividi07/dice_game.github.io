const containerPlayer1 = document.querySelector('.player--0');
const containerPlayer2 = document.querySelector('.player--1');
const totalScorePlayer1 = document.querySelector('#score--0');
const totalScorePlayer2 = document.querySelector('#score--1');
const currentScorePlayer1 = document.querySelector('#current--0');
const currentScorePlayer2 = document.querySelector('#current--1');
const diceElem = document.querySelector('.dice');
const newGameBtn = document.querySelector ('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Definire variabile globale care vor fi folosite in functii
var scores, currentScore, currentPlayer, clickCounter, activeGame;


// Functii pentru actiuni

function newGame(){
    // Resetari de variabile
    scores = [0,0];
    currentScore = 0;
    currentPlayer = 0;
    clickCounter = 0;
    activeGame = true;
    // Resetare UI
    totalScorePlayer1.textContent = '0';
    totalScorePlayer2.textContent = '0';
    currentScorePlayer1.textContent = '0';
    currentScorePlayer2.textContent = '0';
    //Resetare clase containere
    //.player--winner .player--active
    containerPlayer1.classList.remove('player--active','player--winner');
    containerPlayer2.classList.remove('player--active','player--winner');
    containerPlayer1.classList.add('player--active');
    
}

function rollDice(){
// DACA JOCUL E ACTIV 
if (activeGame) {
    // 1. Generăm un număr aleatoriu
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    // 2. Calculăm click-urile (incrementare)
    clickCounter++;
    // 3.Afişăm faţa zarului în corespundere cu numărul aleatoriu generat
    diceElem.classList.remove('hidden');
    diceElem.src = `dice-${dice}.png`;


    // - - - - Condiţii speciale:
    // dacă nimereşte zarul cu 1 -> schimbăm jucătorul
    if (dice === 1) {
        switchPlayer();
    }
    // dacă suntem la a treia aruncare de zar din mutare,
    else if (clickCounter > 2) {
        // - actualizăm scorul curent funcţional (adăugăm numărul aleatoriu primit la scorul curent)
        currentScore += dice;
        // - actualizăm scorul curent UI
        document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
        // - adăugăm tot scorul curent la scorul total
        holdScore();
    } else {
        // dacă suntem la prima sau a doua aruncare de zar din mutare,
        // - actualizăm scorul curent funcţional (adăugăm numărul aleatoriu primit la scorul curent)
        currentScore += dice;
        // - actualizăm scorul curent UI
        document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
    }
}
}

function holdScore(){
    if (activeGame) {
        //Adăugăm scorul curent la scorul total, actualizăm scorul total
        //funcţional  
        scores[currentPlayer] += currentScore;
        //console.log(scores[currentPlayer]);
        //UI
        document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer];

        // Verificăm dacă scorul a depăşit limita (100 sau 20)
        if (scores[currentPlayer] >= 20) {
            // true: finalizăm jocul:
            //- containerul ce are clasa active primeşte adiţional clasa winner
            document.querySelector('.player--active').classList.add('player--winner');
            //- ascundem zarul
            diceElem.classList.add('hidden');
            //- setăm activeGame la false
            activeGame = false;
        } else { // false: schimbam jucatorul
            switchPlayer();
        }
    }

}
function switchPlayer(){
// - - - FUNCTIONAL
    // Scorul curent se resetează la 0
    currentScore = 0;
    // Se schimbă jucătorul activ (dacă e 0 - devine 1 şi viceversa)
    currentPlayer == 1 ? currentPlayer = 0 : currentPlayer = 1;
    // Click-urile se resetează la 0
    clickCounter = 0;

    // - - - UI
    // Scorul curent se resetează la 0
    document.getElementById(`current--${currentPlayer}`).textContent = '0';
    // Containerele jucătorilor fac schimb la clasa active
    containerPlayer1.classList.toggle('player--active');
    containerPlayer2.classList.toggle('player--active');
}

newGame();
// Adaugam event listenere pentru click pe butoane
newGameBtn.addEventListener('click',newGame);
rollDiceBtn.addEventListener('click',rollDice);
holdBtn.addEventListener('click',holdScore);