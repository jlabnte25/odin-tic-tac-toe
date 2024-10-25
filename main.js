// Create game board
const gameBoardModule = (function () {
    const gameBoardDiv = document.getElementById('gameBoardDiv');

    const createCells = () => {
        for (let i = 0; i < 9; i++) {
            const cellBtn = document.createElement('button');
            cellBtn.value = i;
            
            cellBtn.addEventListener('click', () => {
                cellBtn.textContent = turnModule.getTurn() % 2 !== 0 ? "X" : "O";
                turnModule.alternatePlayer(parseInt(cellBtn.value));
                announceWinnerModule ()
                cellBtn.disabled = true; // Disable the clicked button

                
            });
            gameBoardDiv.appendChild(cellBtn);
        }
    };

    return { createCells , gameBoardDiv,};

})(); 

// Create game mechanics
const playGameModule = (function (playerChoice) {

    // Create a playing field that gets updated everytime playGame function is run 
    let gameBoard = {
            scoreArray: [null,null,null,null,null,null,null,null,null,]
    };   

    // Check if gameBoard is being updated
    console.log(gameBoard.scoreArray)

    // Make a private variable that updates the gameBoard for player 1
    const setPlayerOneChoice = function (playerChoice) {
        if (gameBoard.scoreArray[playerChoice] === null) {
            gameBoard.scoreArray[playerChoice] = 1;
        }
        return [gameBoard.scoreArray];
    };

    // Make a private variable that updates the gameBoard for player 2
    const setPlayerTwoChoice = function (playerChoice) {
        if (gameBoard.scoreArray[playerChoice] === null) {
            gameBoard.scoreArray[playerChoice] = 0;
        }
        return [gameBoard.scoreArray];
    };

    // Evaluate the gameBoard for any winners
    function gameWinner () {
        const cell = gameBoard.scoreArray;
    
        if (
            (cell[0] === 1 && cell[1] === 1 && cell[2] === 1) ||
            (cell[3] === 1 && cell[4] === 1 && cell[5] === 1) ||
            (cell[6] === 1 && cell[7] === 1 && cell[8] === 1) ||
            (cell[0] === 1 && cell[3] === 1 && cell[6] === 1) ||
            (cell[1] === 1 && cell[4] === 1 && cell[7] === 1) ||
            (cell[2] === 1 && cell[5] === 1 && cell[8] === 1) ||
            (cell[0] === 1 && cell[4] === 1 && cell[8] === 1) ||
            (cell[2] === 1 && cell[4] === 1 && cell[6] === 1)
        ) {
            return playerModule.getPlayerOne();
        } else if (
            (cell[0] === 0 && cell[1] === 0 && cell[2] === 0) ||
            (cell[3] === 0 && cell[4] === 0 && cell[5] === 0) ||
            (cell[6] === 0 && cell[7] === 0 && cell[8] === 0) ||
            (cell[0] === 0 && cell[3] === 0 && cell[6] === 0) ||
            (cell[1] === 0 && cell[4] === 0 && cell[7] === 0) ||
            (cell[2] === 0 && cell[5] === 0 && cell[8] === 0) ||
            (cell[0] === 0 && cell[4] === 0 && cell[8] === 0) ||
            (cell[2] === 0 && cell[4] === 0 && cell[6] === 0)
        ) {
            return playerModule.getPlayerTwo();
        } else if (cell.every(value => value != null)) {
            return 'Nobody';
        }
        return null;
    }; 

    // Expose only the necessary properties
    return {setPlayerOneChoice, setPlayerTwoChoice, gameWinner, gameBoard}

})();

// Alternate between the two players
const turnModule = (function () {
    let turn = 1;

    const alternatePlayer = function (playerChoice) {
        if (turn % 2 !== 0) {
            playGameModule.setPlayerOneChoice(playerChoice);
            turn++;
            console.log (turn); // check if turn is updating
        } else {
            playGameModule.setPlayerTwoChoice(playerChoice);
            turn++;
            console.log (turn); // check if turn is updating
        }
    };

    const resetTurn = function () {
        turn = 1;  // Reset to initial value
        console.log("Turn reset to:", turn);  // Verify reset
    };

    return {
        getTurn: () => turn,
        alternatePlayer, // Returning the function directly
        resetTurn,
    };
})();


//Reset Game
const resetBtn = document.getElementById('resetButton');
resetBtn.addEventListener('click', resetGame);

function resetGame () {
    while (gameBoardModule.gameBoardDiv.firstChild) {
        gameBoardModule.gameBoardDiv.removeChild(gameBoardModule.gameBoardDiv.firstChild);
    }

    playGameModule.gameBoard.scoreArray = [null, null, null, null, null, null, null, null, null];

    playerModule.resetPlayers(); 

    document.getElementById('playerOneName').textContent = '';
    document.getElementById('playerTwoName').textContent = '';
    document.getElementById('playerOne').value = '';
    document.getElementById('playerTwo').value = '';
    
    const announcement = document.getElementById('announcement');
    announcement.textContent = "";
   
    // gameBoardModule.createCells();

   turnModule.resetTurn();

    const submitBtn = document.getElementById('submitPlayerName');
    submitBtn.disabled = false;
    
}


// Player Factory
const playerModule = (function () {
    let playerOne = "";  // Private variable
    let playerTwo = "";  // Private variable

    const playerOneName = document.getElementById('playerOneName');
    const playerTwoName = document.getElementById('playerTwoName');
    const form = document.querySelector('form');
    const submitBtn = document.getElementById('submitPlayerName');

    // Attach event listener to form submit
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        createPlayers();
        submitBtn.disabled = true; 
        gameBoardModule.createCells()
    });

    // Function to create players and update the UI
    function createPlayers() {
        playerOne = document.getElementById('playerOne').value;
        playerTwo = document.getElementById('playerTwo').value;

        playerOneName.textContent = playerOne;
        playerTwoName.textContent = playerTwo;
    }

    // Reset player names
    function resetPlayers() {
        playerOne = "";
        playerTwo = "";
    }

    // Expose only what you want accessible to the outside
    return {
        getPlayerOne: () => playerOne,
        getPlayerTwo: () => playerTwo,
        resetPlayers,
    };
})();

//Announce winner
function announceWinnerModule () {
    const announcement = document.getElementById('announcement');
    
    // Function to check and announce the winner\
    const winner = playGameModule.gameWinner(); // Call to get the current winner
    
    if (winner !== null) { 
        announcement.textContent = `${winner} won!`; // Update the announcement
        };
}


