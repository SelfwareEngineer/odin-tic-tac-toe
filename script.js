"use strict";

const gameBoard = (function () {
  let board = [];

  function updateBoard(symbol, index) {
    if (board[index] != " ") {
      return 1;
    } else {
      board[index] = symbol;
      render();
      return 0;
    }
  }

  function clearBoard() {
    board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    render();
  }

  function render() {
    console.log("-------");
    console.log("|" + board[0] + "|" + board[1] + "|" + board[2] + "|");
    console.log("-------");
    console.log("|" + board[3] + "|" + board[4] + "|" + board[5] + "|");
    console.log("-------");
    console.log("|" + board[6] + "|" + board[7] + "|" + board[8] + "|");
    console.log("-------");
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
      // for some reason the console thinks `board` is an obj...?
    } else if (!board.includes(" ")) {
      return "tie";
    } else {
      return false;
    }
  }

  return { updateBoard, clearBoard, isGameOver };
})();

const players = (function () {
  let _playerList = [];

  function createPlayer() {
    // const playerName = prompt("Enter Player Name: ");

    let playerNumber;
    if (_playerList.length === 0) {
      playerNumber = 1;
    } else if (_playerList.length === 1) {
      playerNumber = 2;
    }

    let playerSymbol;
    if (_playerList.length === 0) {
      playerSymbol = "X";
    } else if (_playerList.length === 1) {
      playerSymbol = "O";
    }

    console.log(
      playerName +
        " successfully added as Player " +
        playerNumber +
        " (" +
        playerSymbol +
        ").",
    );

    _playerList.push({ playerName, playerNumber, playerSymbol });
  }

  function clearPlayers() {
    _playerList = [];
  }

  function getPlayerList() {
    return _playerList;
  }

  return { createPlayer, clearPlayers, getPlayerList };
})();

const game = (function () {
  let currentPlayer = null;

  function playGame() {
    newGame();
    while (!gameBoard.isGameOver()) {
      playTurn();
    }

    const gameOver = gameBoard.isGameOver();
    if (gameOver === "tie") {
      console.log("It's a tie!");
    } else {
      console.log(currentPlayer.playerName + " wins!");
    }

    // let playAgain = prompt("Play again?").toLowerCase();
    while (!["y", "n"].includes(playAgain)) {
      // playAgain = prompt("Please select y or n. Play again?").toLowerCase();
    }
    if (playAgain === "y") {
      playGame();
    } else {
      console.log("Goodbye!");
    }
  }

  function newGame() {
    gameBoard.clearBoard();
    players.clearPlayers();
    currentPlayer = null;
    for (let i = 1; i <= 2; i++) {
      players.createPlayer();
    }
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
    console.log("It's " + currentPlayer.playerName + "'s turn!");
    // let playIndex = prompt("choose an index (0-8)");
    while (gameBoard.updateBoard(currentPlayer.playerSymbol, playIndex) != 0) {
      // playIndex = prompt(
      // "Invalid choice; please choose an unoccupied index (0-8)",
      // );
    }
  }

  return { playGame };
})();

game.playGame();
