import gameBoard from "./gameBoard.js";
export default function player(name) {
  const customBoard = gameBoard();

  const setUpBoard = (fleet) => {
    fleet.forEach((ship) => {
      customBoard.placeShip(...ship);
    });
  };

  return { name, customBoard, setUpBoard };
}
