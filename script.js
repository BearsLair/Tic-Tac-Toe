const squares = document.querySelectorAll(".square");
const playerNames = document.querySelector(".players");
const instructions = document.querySelector(".instructions");
const start = document.querySelector("#start");

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

  // Win conditions array based on nodelist index position in squares varibale
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

  // Set beginning conditions
  let matchTie = false;
  let playerOneTurn = true;
  let turn = 1;
  let winCounter = 0;
  let winner = "";
  let squareId = 0;
  instructions.textContent = `${playerOne}, which square do you pick?`;

  // Game log used display player choices to the DOM will be implemented later
  let gamelog = [];

  // Event listener added to each square, with relevant ID.
  // Click of a square controls game flow for each turn.
  // This effectively "pauses" the game to wait for player input,
  // without major impact on browser peformance.
  // Player playing as X always goes first.
  squares.forEach((square) => {
    square.addEventListener("click", () => {
      squareId = squareId++;

      // Tie
      if (turn === 9) {
        instructions.textContent = "Game is tied!";
      }

      // Player one (X) turn
      if (turn % 2 !== 0) {
        text = document.createTextNode(currentPlayers[0].playerOneIcon);
        square.appendChild(text);
        currentPlayers[0].playerOneMoves.push(squareId);
        // Disable click event for square once clicked
        square.style.pointerEvents = "none";

        //Evaluate if win condition met
        if (turn > 2 && turn < 9) {
          for (let i = 0; i < 8; i++) {
            for (let k = 0; i < 2; k++) {
              if (currentPlayers.[0].playerOneMoves.includes(winConditions[i][k])) {
                winCounter++;
              }
            }
          }
        }

        turn++;

        // Player two (O) turn
      } else if (turn % 2 === 0) {
        text = document.createTextNode(currentPlayers[1].playerTwoIcon);
        square.appendChild(text);
        currentPlayers[1].playerTwoMoves.push(squareId);
        // Disable click event for square once clicked
        square.style.pointerEvents = "none";
        turn++;
      }
    });
  });

  // This will add the text to the selected HTML element
  // text = document.createTextNode(currentPlayers[0].playerOneIcon);
  // element.appendChild(text);
}
