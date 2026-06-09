import screenUpdater from "./screenUpdater.js";
import player from "./player.js";

export default function gameController() {
  // instantiate
  const board1Div = document.querySelector(".player1-div");
  const board2Div = document.querySelector(".player2-div");
  const winnerDisplay = document.querySelector(".winner");
  const player1 = player("Player 1");
  const player2 = player("Player 2");
  const player1Board = player1.customBoard;
  const player2Board = player2.customBoard;
  const player1Fleet = [
    ["b2", 1, true],
    ["b6", 3, false],
    ["d4", 4, true],
    ["f2", 2, true],
    ["f8", 1, true],
    ["h6", 1, true],
    ["h10", 3, true],
    ["i4", 1, true],
    ["j1", 2, false],
    ["j6", 2, false],
  ];
  const player2Fleet = [
    ["a8", 1, true],
    ["a10", 3, true],
    ["c3", 1, false],
    ["d5", 4, false],
    ["f1", 3, true],
    ["f5", 2, false],
    ["h3", 2, false],
    ["h10", 1, true],
    ["j5", 2, false],
    ["j9", 1, false],
  ];

  let currentPlayer = player1;
  let currentBoard = player1Board;
  let opponentBoard = player2Board;

  const initiate = () => {
    strategize(player1Board, player1Fleet);
    strategize(player2Board, player2Fleet);
    createBoard(player1Board.getBoard(), board1Div);
    createBoard(player2Board.getBoard(), board2Div);
  };

  const endGame = () => {
    winnerDisplay.textContent = `${currentPlayer.name} won!`;
    board2Div.style.visibility = "visible";
    board1Div.style.visibility = "visible";
    [board1Div, board2Div].forEach((board) => {
      board.removeEventListener("click", handleAttack);
    });
  };

  const handleAttack = (e) => {
    screenUpdater().colorize(opponentBoard, e.target);
    const hit = opponentBoard.receiveAttack(e.target.dataset.id);
    e.target.setAttribute("disabled", true);
    if (opponentBoard.isAllSunk()) {
      endGame();
      return;
    }
    if (!hit) {
      switchTurn();
    }
    e.preventDefault();
  };

  //   private
  const strategize = (board, fleet) => {
    fleet.forEach((warship) => board.placeShip(...warship));
  };

  const createBoard = (board, target) => {
    screenUpdater().renderBoard(board, target);
    // target.addEventListener("click", handleAttack);
    board2Div.addEventListener("click", handleAttack);
  };

  const switchTurn = () => {
    currentBoard = currentBoard == player1Board ? player2Board : player1Board;
    opponentBoard = opponentBoard == player1Board ? player2Board : player1Board;
    currentPlayer = currentPlayer == player1 ? player2 : player1;
    [board1Div, board2Div].forEach((div) => {
      div.classList.toggle("current");
      div.classList.toggle("opponent");
    });
    if (opponentBoard == player1Board) {
      // board2Div.style.visibility = "hidden";
      // board1Div.style.visibility = "visible";
      board2Div.removeEventListener("click", handleAttack);
      board1Div.addEventListener("click", handleAttack);
    } else {
      // board1Div.style.visibility = "hidden";
      // board2Div.style.visibility = "visible";
      board1Div.removeEventListener("click", handleAttack);
      board2Div.addEventListener("click", handleAttack);
    }
  };

  return { initiate, switchTurn };
}
