import screenUpdater from "./screenUpdater.js";
import player from "./player.js";

export default function gameController() {
  // instantiate
  let numberOfHumans = 1
  const playOptionForm = document.querySelector("form");
  let opponent = null;
  let eTarget = true;
  let isHit = false;
  let opponentSection = ".player2-div";
  const board1Div = document.querySelector(".player1-div");
  const board2Div = document.querySelector(".player2-div");
  const opponentDiv = document.querySelector(".opponent");
  const currentDiv = document.querySelector(".current");
  const winnerDisplay = document.querySelector(".winner");
  const currentPlayerDisplay = document.querySelector(".current-player");
  const passBoardBtn = document.querySelector(".pass-board");
  const player1 = player("Player 1");
  const player2 = player("Player 2");
  const player1Board = player1.customBoard;
  const player2Board = player2.customBoard;
  // const player1Fleet = [
  //   ["b2", 1, true],
  //   ["b6", 3, false],
  //   ["d4", 4, true],
  //   ["f2", 2, true],
  //   ["f8", 1, true],
  //   ["h6", 1, true],
  //   ["h10", 3, true],
  //   ["i4", 1, true],
  //   ["j1", 2, false],
  //   ["j6", 2, false],
  // ];
  // const player2Fleet = [
  //   ["a8", 1, true],
  //   ["a10", 3, true],
  //   ["c3", 1, false],
  //   ["d5", 4, false],
  //   ["f1", 3, true],
  //   ["f5", 2, false],
  //   ["h3", 2, false],
  //   ["h10", 1, true],
  //   ["j5", 2, false],
  //   ["j9", 1, false],
  // ];

  let currentPlayer = player1;
  let opponentPlayer = player2;
  let currentBoard = player1Board;
  let opponentBoard = player2Board;

  const initiate = () => {
    // strategize(player1Board, player1Fleet);
    // strategize(player2Board, player2Fleet);
    createBoard(player1Board.getBoard(), board1Div);
    createBoard(player2Board.getBoard(), board2Div);
    currentPlayerDisplay.textContent = `${currentPlayer.name} turn`;
    player1.setUpFleet(".port1")
    if (opponent != "human") {
      player2.generatePossibleMoves();
      document.querySelector(".port2").style.display = 'none';
    }else {
      player2.setUpFleet(".port2")
    }
  };

  const endGame = () => {
    winnerDisplay.textContent = `${currentPlayer.name} won!`;
    [board1Div, board2Div].forEach((board) => {
      board.removeEventListener("click", handleAttack);
      board.classList.add("over");
    });
  };

  const handleAttack = (target) => {
    screenUpdater().colorize(opponentBoard, target, opponentSection);
    const hit = opponentBoard.receiveAttack(target);
    // if (eTarget) {
    //   hit = opponentBoard.receiveAttack(target.dataset.id);
    // } else {
    //   hit = opponentBoard.receiveAttack(target);
    // }
    // e.target.setAttribute("disabled", true);
    if (opponentBoard.isAllSunk()) {
      endGame();
      return;
    }
    if (!hit) {
      passBoardBtn.classList.toggle("hide");
      passBoardBtn.textContent = `Pass board to ${opponentPlayer.name}`;
      opponentDiv.removeEventListener("click", attackListener);
      opponentDiv.style.cursor = "not-allowed";
      currentDiv.removeEventListener("click", attackListener);
      isHit = false;
    } else {
      isHit = true;
    }
    // e.preventDefault();
  };

  //   private
  const strategize = (board, fleet) => {
    fleet.forEach((warship) => board.placeShip(...warship));
  };

  const createBoard = (board, target) => {
    screenUpdater().renderBoard(board, target);
    board2Div.addEventListener("click", attackListener);
  };

  const attackListener = (e) => {
    eTarget = true;
    handleAttack(e.target.dataset.id);
    e.target.setAttribute("disabled", true);
    e.preventDefault();
  };

  const switchTurn = () => {
    currentBoard = currentBoard == player1Board ? player2Board : player1Board;
    opponentBoard = opponentBoard == player1Board ? player2Board : player1Board;
    currentPlayer = currentPlayer == player1 ? player2 : player1;
    opponentPlayer = opponentPlayer == player1 ? player2 : player1;
    opponentSection =
      opponentSection == ".player1-div" ? ".player2-div" : ".player1-div";

    if (opponentBoard == player1Board) {
      board2Div.removeEventListener("click", attackListener);
      board1Div.addEventListener("click", attackListener);
    } else {
      board1Div.removeEventListener("click", attackListener);
      board2Div.addEventListener("click", attackListener);
    }
    if (opponent == "human") {
      [board1Div, board2Div].forEach((div) => {
        div.classList.toggle("current");
        div.classList.toggle("opponent");
      });
    } else if (opponentPlayer == player1) {
      eTarget = null;
      aiMove();
    }
    currentPlayerDisplay.textContent = `${currentPlayer.name} turn`;
  };

  const aiMove = () => {
    handleAttack(player2.aiAttack());
    while (isHit) {
      handleAttack(player2.aiAttack());
    }
  };

  const passBoard = () => {
    passBoardBtn.classList.toggle("hide");
    switchTurn();
  };

  passBoardBtn.addEventListener("click", passBoard);

  playOptionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    initiate();
    const formReturns = new FormData(playOptionForm);
    opponent = formReturns.get("play-option");
    numberOfHumans = opponent == 'ai' ? 1 : 2
    playOptionForm.style.display = "none";
  });

  return { initiate, switchTurn };
}
