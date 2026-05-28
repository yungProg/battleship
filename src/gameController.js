import screenUpdater from "./screenUpdater.js";
import player from "./player.js"

export default function gameContoller() {
    // instantiate
    const player1 = player("Player 1");
    const player2 = player("Player 2");
    const player1Board = player1.customBoard;
    const player2Board = player2.customBoard;

    const createBoards = () => {
        screenUpdater().renderBoard(player1Board.getBoard(), ".player1-div");
        screenUpdater().renderBoard(player1Board.getBoard(), ".player2-div");
    }

    return { createBoards }
}