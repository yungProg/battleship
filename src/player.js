import gameBoard from "./gameBoard.js";
export default function player(name) {
  const customBoard = gameBoard();
  const possibleMoves = []

  const setUpBoard = (fleet) => {
    fleet.forEach((ship) => {
      customBoard.placeShip(...ship);
    });
  };

  const aiAttack = () => {
    const randomNumber = Math.floor(Math.random() * possibleMoves.length)
    return possibleMoves[randomNumber]
  }

  const generatePossibleMoves = () => {
    const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const columns = [1,2,3,4,5,6,7,8,9,10];
    rows.forEach(row => {
      columns.forEach(column => {
        possibleMoves.push(`${row}${column}`)
      })
    })
  }

  return { name, customBoard, setUpBoard, aiAttack, generatePossibleMoves };
}
