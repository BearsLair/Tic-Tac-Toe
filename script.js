const squares = document.querySelectorAll(".square");
const playerNames = document.querySelector(".players");
const instructions = document.querySelector(".instructions");
const start = document.querySelector("#start");
const result = document.querySelector(".result");

// Set beginning conditions
let win = false;
let turn = 1;
let winCounter = 0;
let playerIcon = null;
let playerMoves = null;
let nextPlayerInstructions = "";
let playerWin = "";
squares.forEach((square) => {
  square.style.pointerEvents = "auto";
  square.textContent = "";
});

function ticTacToe() {
  // Ask for the names of both players
  const playerOne = prompt("Name of Player for X");
  const playerTwo = prompt("Name of Player for O");

  // Object factory function to create players (assign name, icon, and list of moves)
  function players(playerOne, playerTwo) {
    const playerOneName = playerOne;
    const playerOneIcon = "X";
    let playerOneMoves = [];

    const playerTwoName = playerTwo;
    const playerTwoIcon = "O";
    let playerTwoMoves = [];

    return [
      { playerOneName, playerOneIcon, playerOneMoves },
      { playerTwoName, playerTwoIcon, playerTwoMoves },
    ];
  }

  // Players created with factory function and assigned to currentPlayers variable
  const currentPlayers = players(playerOne, playerTwo);

  playerNames.textContent = `${playerOne}(X) vs. ${playerTwo}(O)`;

  // Set beginning conditions
  let win = false;
  let turn = 1;
  let playerIcon = null;
  let playerMoves = null;
  let nextPlayerInstructions = "";
  let playerWin = "";

  squares.forEach((square) => {
    square.style.pointerEvents = "auto";
    square.textContent = "";
  });

  instructions.textContent = `${playerOne}, which square do you pick?`;

  // Game log used display list of player choices to the DOM will be implemented later
  let gamelog = [];

  // Event listener added to each square, with relevant ID.
  // Click of a square controls game flow for each turn.
  // This effectively "pauses" the game to wait for player input.
  // Player playing as X always goes first.
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      let squareId = Array.prototype.indexOf.call(squares, square) + 1;

      // Player one (X) turn
      if (turn % 2 !== 0) {
        playerName = currentPlayers[0].playerOneName;
        playerIcon = currentPlayers[0].playerOneIcon;
        playerMoves = currentPlayers[0].playerOneMoves;
        nextPlayerInstructions = `${playerTwo}, which square do you pick?`;
        playerWin = `${playerOne} wins the game!`;
        // Player two (O) turn
      } else if (turn % 2 === 0) {
        playerName = currentPlayers[1].playerTwoName;
        playerIcon = currentPlayers[1].playerTwoIcon;
        playerMoves = currentPlayers[1].playerTwoMoves;
        nextPlayerInstructions = `${playerOne}, which square do you pick?`;
        playerWin = `${playerTwo} wins the game!`;
      }

      square.textContent = playerIcon;
      playerMoves.push(squareId);
      // Disable click event for square once clicked
      square.style.pointerEvents = "none";

      //Evaluate if win condition met for a player
      if (turn > 2 && turn < 10) {
        determinWin();
      }

      if (win === true) {
        squares.forEach((square) => {
          square.style.pointerEvents = "none";
        });
        instructions.textContent = playerWin;
        winCounter = 0;
      } else {
        instructions.textContent = nextPlayerInstructions;
      }
      turn++;

      if (turn === 10) {
        instructions.textContent = "Game is tied!";
        squares.forEach((square) => {
          square.style.pointerEvents = "none";
        });
      }
    });
  });
}

function determinWin(playerMoves) {
  // Win conditions array based on nodelist index position in squares variable
  winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  let winCounter = 0;

  // Loops though winConditions and the current playerMoves to determine if win met
  // Returns win to be true if win detected
  for (let i = 0; i < 8; i++) {
    for (let k = 0; k < 3; k++) {
      if (playerMoves.includes(winConditions[i][k])) {
        winCounter++;
      }
      if (k === 2 && winCounter < 3) {
        winCounter = 0;
      } else if (winCounter === 3) {
        return (win = true);
      }
    }
  }
}

start.addEventListener("click", () => {
  ticTacToe();
});
