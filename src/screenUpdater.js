export default function screenUpdater() {
    const renderBoard = (board, selector) => {
        const targetDiv = document.querySelector(selector)
        board.forEach((row, i) => {
            const rowDiv = document.createElement("div");
            row.forEach((cell, j) => {
                const cellBtn = document.createElement("button");
                cellBtn.setAttribute("type", "button");
                cellBtn.dataset.id = `${letter[i]}${j + 1}`
                colorize(cell, cellBtn)
                rowDiv.appendChild(cellBtn)
            })
            targetDiv.appendChild(rowDiv)
        })
    }

    // private

    const letter = {
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
        4: 'e',
        5: 'f',
        6: 'g',
        7: 'h',
        8: 'i',
        9: 'j'
    }

    const colorize = (cell, cellBtn) => {
        if (cell == 0) {
            cellBtn.style.backgroundColor = '#5843f5'
        } else if (cell == null) {
            cellBtn.style.backgroundColor = '#6a6a6a'
        } else {
            cellBtn.style.backgroundColor = '#fb3434'
        }
    }

    return {renderBoard}
}