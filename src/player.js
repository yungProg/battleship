import gameBoard from "./gameBoard.js";
export default function player(name) {
  const customBoard = gameBoard();
  const possibleMoves = [];
  const fleet = {
    1: [4, "one", false],
    2: [3, "two", false],
    3: [2, "three", false],
    4: [1, "four", false]
  }

  const setUpFleet = (portName) => {
    const port = document.querySelector(portName);
    for (const ship in fleet) {
      const dock = document.createElement("div")
      dock.classList.add(fleet[ship][1])
      for (let i = 0; i < fleet[ship][0]; i++) {
        const newShip = document.createElement("button");
        newShip.dataset.length = ship;
        newShip.dataset.isVertical = fleet[ship][2];
        newShip.setAttribute("draggable", true);
        dock.appendChild(newShip)
      }
      port.appendChild(dock)
    }
  };

  const aiAttack = () => {
    const randomNumber = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves.splice(randomNumber, 1)[0];
    console.log(possibleMoves.length);
    return move;
  };

  const generatePossibleMoves = () => {
    const rows = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
    const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    rows.forEach((row) => {
      columns.forEach((column) => {
        possibleMoves.push(`${row}${column}`);
      });
    });
  };

  return { name, customBoard, setUpFleet, aiAttack, generatePossibleMoves };
}
