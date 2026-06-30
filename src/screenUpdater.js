export default function screenUpdater() {
  const letter = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
    8: "i",
    9: "j",
  };

  const renderBoard = (board, targetDiv) => {
    targetDiv.textContent = "";
    board.forEach((row, i) => {
      const rowDiv = document.createElement("div");
      row.forEach((cell, j) => {
        const cellBtn = document.createElement("button");
        cellBtn.setAttribute("type", "button");
        cellBtn.dataset.id = `${letter[i]}${j + 1}`;
        if (cell) {
          cellBtn.classList.add("ship");
        }
        rowDiv.appendChild(cellBtn);
      });
      targetDiv.appendChild(rowDiv);
    });
  };

  const colorize = (board, cellId, section) => {
    const cellBtn = document.querySelector(`${section} [data-id=${cellId}]`);
    cellBtn.style.backgroundColor = "#6a6a6a";
    if (board.getCell(cellBtn.dataset.id) == 0) {
      cellBtn.textContent = ".";
    } else {
      cellBtn.textContent = "X";
      cellBtn.style.color = "#f63434";
      cellBtn.classList.remove("ship");
    }
  };

  return { renderBoard, colorize };
}
