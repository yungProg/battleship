import gameBoard from "./gameBoard.js";
import screenUpdater from "./screenUpdater.js";
export default function player(name) {
  const customBoard = gameBoard();
  const possibleMoves = [];
  const fleet = {
    1: [4, "one", false],
    2: [3, "two", false],
    3: [2, "three", false],
    4: [1, "four", false],
  };
  let dragged = null;

  const assembleFleet = (portName, targetName) => {
    const port = document.querySelector(portName);
    const battleField = document.querySelector(targetName);

    const receiveShip = (e) => {
      if (
        customBoard.placeShip(
          e.target.dataset.id,
          dragged.dataset.length,
          dragged.dataset.isVertical,
        )
      ) {
        dragged.parentNode.removeChild(dragged);
        screenUpdater().renderBoard(customBoard.getBoard(), battleField);
      }
      if (
        port.children[0].children.length == 0 &&
        port.children[1].children.length == 0 &&
        port.children[2].children.length == 0 &&
        port.children[3].children.length == 0
      ) {
        document.querySelector(".ready-btn").classList.remove("hide");
        port.classList.add("hide");
        battleField.removeEventListener("drop", receiveShip);
        battleField.removeEventListener("dragover", reactToShipHover);
      }
    };

    const reactToShipHover = (e) => {
      e.preventDefault();
      e.target.style.transform = "scale(1.2)";
    };

    for (const ship in fleet) {
      const dock = document.createElement("div");
      dock.classList.add(fleet[ship][1]);
      for (let i = 0; i < fleet[ship][0]; i++) {
        const newShip = document.createElement("button");
        newShip.dataset.length = ship;
        newShip.dataset.isVertical = fleet[ship][2];
        newShip.setAttribute("draggable", true);
        newShip.addEventListener("dragstart", (e) => {
          dragged = newShip;
        });
        dock.appendChild(newShip);
      }
      port.appendChild(dock);
    }
    battleField.addEventListener("dragover", reactToShipHover);
    battleField.addEventListener("dragleave", (e) => {
      e.preventDefault();
      e.target.style.transform = "scale(1)";
    });
    battleField.addEventListener("drop", receiveShip);
  };

  const aiAttack = () => {
    const randomNumber = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves.splice(randomNumber, 1)[0];
    console.log(possibleMoves.length);
    return move;
  };

  const aiStrategize = () => {
    const possibleMovesDup = [...possibleMoves];
    for (const ship in fleet) {
      let counter = 0;
      while (counter < fleet[ship][0]) {
        let randomNumber = Math.floor(Math.random() * possibleMovesDup.length);
        let move = possibleMovesDup.splice(randomNumber, 1)[0];
        let isVertical = [true, false][Math.floor(Math.random() * 2)];
        if (customBoard.placeShip(move, ship, isVertical)) {
          counter += 1;
        }
      }
      console.log(fleet[ship][0]);
    }
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

  return {
    name,
    customBoard,
    assembleFleet,
    aiAttack,
    generatePossibleMoves,
    aiStrategize,
  };
}
