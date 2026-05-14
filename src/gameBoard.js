import ship from "./ship.js"

export default function gameBoard () {
    let board = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ];

    const getBoard = () => board;

    const placeShip = (coordinate, length, isVertical) => {
        const [row, column] = [getRowIndex(coordinate), getColumnIndex(coordinate)]
        const boardDup = board;
        if (isInvalidPosition(row, column, length, isVertical)) {
            return
        }
        if (isVertical) {
            if (isOverFlow(row, length)) {
                return
            }
            for (let i = row; i < (row + length); i++) {
                board[i][column] = ship(length)
            }
        } else {
            if (isOverFlow(column, length)) {
                return
            }
            for (let i = column; i < (column + length); i++) {
                board[row][i] = ship(length)
            }
        }
    }

    const isInvalidPosition = (x, y, length, isVertical) => {
        if (isVertical) {
            for (let i = x; i < (x + length); i++) {
                let positions = [[i - 1, y], [i, y], [i + 1, y], [i - 1, y- 1], [i + 1, y + 1], [i, y - 1], [i, y + 1], [i - 1, y + 1], [i + 1, y - 1]]
                positions = positions.filter(pair => pair.every(coordinate => coordinate >= 0 && coordinate < 10))
                for (const coordinates of positions) {
                    if (board[coordinates[0]][coordinates[1]] != 0) {
                        return true
                    }
                }
                return false;
            }
        } else {
            for (let i = y; i < (y + length); i++) {
                let positions = [[x - 1, i], [x, i], [x + 1, i], [x - 1, i- 1], [x + 1, i + 1], [x, i - 1], [x, i + 1], [x - 1, i + 1], [x + 1, i - 1]]
                positions = positions.filter(pair => pair.every(coordinate => coordinate >= 0 && coordinate < 10))
                for (const coordinates of positions) {
                    if (board[coordinates[0]][coordinates[1]] != 0) {
                        return true
                    }
                }
                return false;
            }
        }
    }

    const isOverFlow = (initial, length) => {
        return (initial + length) > 9
    }

    const getRowIndex = (coordinate) => {
        const rowId = {a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8,j:9};
        return rowId[coordinate[0].toLowerCase()];
    }

    const getColumnIndex = (coordinate) => Number(coordinate[1]) - 1;

    return { getBoard, placeShip };
}