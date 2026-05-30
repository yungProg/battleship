import screenUpdater from "./screenUpdater.js";
import player from "./player.js"

export default function gameContoller() {
    // instantiate
    const player1 = player("Player 1");
    const player2 = player("Player 2");
    const player1Board = player1.customBoard;
    const player2Board = player2.customBoard;
    const player1Fleet = [
        ['b2', 1, true], ['b6', 3, false], ['d4', 4, true], ['f2', 2, true], ['f8', 1 , true], ['h6', 1, true], ['h10', 3, true], ['i4', 1, true], ['j1', 2, false], ['j6', 2, false]
    ]
    const player2Fleet = [
        ['a8', 1, true], ['a10', 3, true], ['c3', 1, false], ['d5', 4, false], ['f1', 3, true], ['f5', 2, false], ['h3', 2, false], ['h10', 1, true], ['j5', 2, false], ['j9', 1, false]
    ]

    const play = () => {
        strategize(player1Board, player1Fleet);
        strategize(player2Board, player2Fleet);
        createBoard(player1Board.getBoard(), '.player1-div');
        createBoard(player2Board.getBoard(), '.player2-div');
    }

    const strategize = (board, fleet) => {
        fleet.forEach(warship => board.placeShip(...warship))
    }

    const createBoard = (board, targetDiv) => {
        screenUpdater().renderBoard(board, targetDiv);
    }

    return { play }
}