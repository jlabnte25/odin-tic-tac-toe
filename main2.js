const playGame = (function (playerChoice) {

    // Create a playing field that gets updated everytime playGame function is run 
    let gameBoard = {
            scoreArray: [null,null,null,null,null,null,null,null,null,]
    };

    // Make a private variable that updates the gameBoard for player 1
    const setPlayerOneChoice = function (playerChoice) {
        if (gameBoard.scoreArray[playChoice] === null) {
            gameBoard.scoreArray[playerChoice] = 1;
        }
    };

    // Make a private variable that updates the gameBoard for player 2
    const setPlayerTwoChoice = function (playerChoice) {
        if (gameBoard.scoreArray[playChoice] === null) {
            gameBoard.scoreArray[playerChoice] = 0;
        }
    };

    // Evaluate the gameBoard for any winners
    function gameWinner (cell) {
        const cell = gameBoard.scoreArray
    
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
            return playerOne;
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
            return playerTwo;
        } else if (cell.every(value => value != null)) {
            return noWinner;
        }
        return null;
    };

    // Expose only the necessary variables
    return {setPlayerOneChoice, setPlayerTwoChoice, gameWinner}
})();



