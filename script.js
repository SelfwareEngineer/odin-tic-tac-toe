"use strict";

const gameBoard = (function () {
  let board = [];

  function updateBoard(symbol, index) {
    board[index] = symbol;
    render();
  }

  function clearBoard() {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    render();
  }

  function disableBoard() {
    for (let i = 0; i <= 8; i++) {
      const targetSquare = document.querySelector(`[data-index="${i}"]`);
      targetSquare.dataset.active = "false";
    }
  }

  function render() {
    for (let i = 0; i <= 8; i++) {
      const targetSquare = document.querySelector(`[data-index="${i}"]`);
      const targetSquareText = targetSquare.querySelector("p");
      targetSquareText.textContent = board[i];
      if (board[i] === " ") {
        targetSquare.dataset.active = "true";
      } else {
        targetSquare.dataset.active = "false";
      }
    }
  }

  function isGameOver() {
    if (
      // Rows
      (board[0] === board[1] && board[0] === board[2] && board[0] != " ") ||
      (board[3] === board[4] && board[3] === board[5] && board[3] != " ") ||
      (board[6] === board[7] && board[6] === board[8] && board[6] != " ") ||
      // Columns
      (board[0] === board[3] && board[0] === board[6] && board[0] != " ") ||
      (board[1] === board[4] && board[1] === board[7] && board[1] != " ") ||
      (board[2] === board[5] && board[2] === board[8] && board[2] != " ") ||
      // Diagonals
      (board[0] === board[4] && board[0] === board[8] && board[0] != " ") ||
      (board[6] === board[4] && board[6] === board[2] && board[6] != " ")
    ) {
      return true;
    } else if (!board.includes(" ")) {
      return "tie";
    } else {
      return false;
    }
  }

  return { updateBoard, clearBoard, disableBoard, isGameOver };
})();

const players = (function () {
  let _playerList = [
    { playerName: "Player 1", playerSymbol: "X" },
    { playerName: "Player 2", playerSymbol: "O" },
  ];

  function getPlayerList() {
    return _playerList;
  }

  return { getPlayerList };
})();

const game = (function () {
  let currentPlayer = null;
  const turnNotification = document.querySelector("h2");

  function newGame() {
    gameBoard.clearBoard();
    currentPlayer = null;
    playTurn();
  }

  function playTurn() {
    if (!currentPlayer) {
      currentPlayer = players.getPlayerList()[0];
    } else {
      if (currentPlayer.playerSymbol === "X") {
        currentPlayer = players.getPlayerList()[1];
      } else {
        currentPlayer = players.getPlayerList()[0];
      }
    }
    turnNotification.textContent =
      "It's " + currentPlayer.playerName + "'s turn!";

    document.addEventListener("click", (e) => {
      const gameSquare = e.target.closest(".game-square");
      if (gameSquare && gameSquare.dataset.active === "true") {
        let playIndex = Number(gameSquare.dataset.index);
        gameBoard.updateBoard(currentPlayer.playerSymbol, playIndex);

        if (gameBoard.isGameOver() === "tie") {
          turnNotification.textContent = "It's a Tie!";
          gameBoard.disableBoard();
          getPlayAgain();
        } else if (gameBoard.isGameOver()) {
          turnNotification.textContent = currentPlayer.playerName + " wins!";
          gameBoard.disableBoard();
          getPlayAgain();
        } else {
          playTurn();
        }
      }
    });
  }

  function getPlayAgain() {
    const playAgainButton = document.createElement("button");
    playAgainButton.type = "button";
    playAgainButton.classList += "play-again-button";
    playAgainButton.textContent = "Play again?";
    playAgainButton.addEventListener("click", () => {
      newGame();
      playAgainButton.remove();
    });
    turnNotification.insertAdjacentElement("afterend", playAgainButton);
  }

  return { newGame };
})();

game.newGame();
