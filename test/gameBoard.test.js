import gameBoard from "../src/gameBoard.js";

test('should place ship at defined location', () => {
    const myGameBoard = gameBoard();
    myGameBoard.placeShip('a1', 1, false);
    expect(myGameBoard.getBoard()[0][0]).not.toBe(0);
})

test('ship occupies horizontal space proportional to its length', () => {
    const myGameBoard = gameBoard();
    myGameBoard.placeShip('c3', 2, false);
    expect(myGameBoard.getBoard()[2][2]).not.toBe(0);
    expect(myGameBoard.getBoard()[2][3]).not.toBe(0);
})

test('ship occupies vertical space proportional to its length', () => {
    const myGameBoard = gameBoard();
    myGameBoard.placeShip('e3', 3, true);
    expect(myGameBoard.getBoard()[4][2]).not.toBe(0);
    expect(myGameBoard.getBoard()[5][2]).not.toBe(0);
    expect(myGameBoard.getBoard()[6][2]).not.toBe(0);
})

test('ship does not overflow', () => {
    const myGameBoard = gameBoard();
    myGameBoard.placeShip('e8', 4, false);
    expect(myGameBoard.getBoard()[4][7]).toBe(0);
    expect(myGameBoard.getBoard()[4][8]).toBe(0);
    expect(myGameBoard.getBoard()[4][9]).toBe(0);
})

test('should not place ship adjacent to another', () => {
    const myGameBoard = gameBoard();
    myGameBoard.placeShip('i1', 1, false);
    myGameBoard.placeShip('j1', 1, false);
    expect(myGameBoard.getBoard()[9][0]).toBe(0)
})

test('should not overlap another ship', () => {
    const myGameBoard = gameBoard();
    myGameBoard.placeShip('g4', 1, false);
    myGameBoard.placeShip('f4', 2, true);
    expect(myGameBoard.getBoard()[5][3]).toBe(0)
})