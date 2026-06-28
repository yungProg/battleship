import gameController from "./gameController.js";

export default function prime() {
  const playOptionForm = document.querySelector("form");
  let opponent = null;

  playOptionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formReturns = new FormData(playOptionForm);
    opponent = formReturns.get("play-option");
    // numberOfHumans = opponent == "ai" ? 1 : 2;
    playOptionForm.style.display = "none";
    initiate();
  });

  const initiate = () => {
    createBoard(player1Board.getBoard(), board1Div);
    createBoard(player2Board.getBoard(), board2Div);
    currentPlayerDisplay.textContent = `${currentPlayer.name} turn`;
    player1.assembleFleet(".port1", ".player1-div");
    if (opponent != "human") {
      player2.generatePossibleMoves();
      document.querySelector(".port2").style.display = "none";
    } else {
      player2.assembleFleet(".port2", ".player2-div");
    }
  };
}
