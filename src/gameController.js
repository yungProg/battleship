import screenUpdater from "./screenUpdater.js";
import player from "./player.js";

export default function gameController() {
  // instantiate
  let numberOfHumans = 1;
  const playOptionForm = document.querySelector("form");
  let opponent = null;
  let eTarget = true;
  let isHit = false;
  let opponentSection = ".player2-div";
  const readyBtn = document.querySelector(".ready-btn");
  const fightBtn = document.querySelector(".fight-btn");
  const board1Div = document.querySelector(".player1-div");
  const board2Div = document.querySelector(".player2-div");
  const opponentDiv = document.querySelector(".opponent");
  let currentDiv;
  const winnerDisplay = document.querySelector(".winner");
  const currentPlayerDisplay = document.querySelector(".current-player");
  const passBoardBtn = document.querySelector(".pass-board");
  const player1 = player("Player 1");
  const player2 = player("Player 2");
  const player1Board = player1.customBoard;
  const player2Board = player2.customBoard;

  let currentPlayer = player1;
  let opponentPlayer = player2;
  let currentBoard = player1Board;
  let opponentBoard = player2Board;

  const initiate = () => {
    screenUpdater().renderBoard(player1Board.getBoard(), board1Div);
    screenUpdater().renderBoard(player2Board.getBoard(), board2Div);
    currentPlayerDisplay.textContent = `${currentPlayer.name} turn`;
    player1.assembleFleet(".port1", ".player1-div");
    if (opponent != "human") {
      player2.generatePossibleMoves();
    } else {
      player2.assembleFleet(".port2", ".player2-div");
    }
  };

  readyBtn.addEventListener("click", (e) => {
    board1Div.removeEventListener("click", attackListener);
    console.log("hi");

    readyBtn.classList.add("hide");
    if (opponent == "ai") {
      fightBtn.classList.remove("hide");
      player2.aiStrategize();
      screenUpdater().renderBoard(player2Board.getBoard(), board2Div);
      return;
    }
    switchTurn();

    document.querySelector(".player1-div").classList.add("opponent");

    if (currentPlayer == player1) {
      fightBtn.classList.remove("hide");
    } else {
      document.querySelector(".port2").classList.remove("hide");
    }
    e.preventDefault();
  });

  fightBtn.addEventListener("click", (e) => {
    board1Div.classList.remove("opponent");
    board1Div.classList.add("current");
    currentDiv = document.querySelector(".current");
    board2Div.addEventListener("click", attackListener);
    fightBtn.classList.add("hide");
  });

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
    console.log(opponentBoard.getBoard());
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
    const formReturns = new FormData(playOptionForm);
    opponent = formReturns.get("play-option");
    numberOfHumans = opponent == "ai" ? 1 : 2;
    playOptionForm.style.display = "none";
    initiate();
  });

  return { initiate, switchTurn };
}
