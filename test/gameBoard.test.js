import gameBoard from "../src/gameBoard.js";

describe('ship placement', () => {
    const myGameBoard = gameBoard();

    beforeAll(() => {
        myGameBoard.placeShip('a1', 1, false);
        myGameBoard.placeShip('c3', 2, false);
        myGameBoard.placeShip('e3', 3, true);
        myGameBoard.placeShip('e8', 4, false);
        myGameBoard.placeShip('i1', 1, false);
        myGameBoard.placeShip('j1', 1, false);
        myGameBoard.placeShip('g4', 1, false);
        myGameBoard.placeShip('f4', 2, true);
    })

    test('should place ship at defined location', () => {
        expect(myGameBoard.getBoard()[0][0]).not.toBe(0);
    })

    test('ship occupies horizontal space proportional to its length', () => {
        expect(myGameBoard.getBoard()[2][2]).not.toBe(0);
        expect(myGameBoard.getBoard()[2][3]).not.toBe(0);
    })

    test('ship occupies vertical space proportional to its length', () => {
        expect(myGameBoard.getBoard()[4][2]).not.toBe(0);
        expect(myGameBoard.getBoard()[5][2]).not.toBe(0);
        expect(myGameBoard.getBoard()[6][2]).not.toBe(0);
    })

    test('ship does not overflow', () => {
        expect(myGameBoard.getBoard()[4][7]).toBe(0);
        expect(myGameBoard.getBoard()[4][8]).toBe(0);
        expect(myGameBoard.getBoard()[4][9]).toBe(0);
    })

    test('should not place ship adjacent to another', () => {
        expect(myGameBoard.getBoard()[9][0]).toBe(0)
    })

    test('should not overlap another ship', () => {
        expect(myGameBoard.getBoard()[5][3]).toBe(0)
    })
})