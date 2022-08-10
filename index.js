startGame(8, 8, 10);

function startGame(width, height, bombsCount) {
  const field = document.querySelector('.field');
  const cellsCount = width * height;
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  const cells = [...field.children];

  // create empty array 
  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5) // sort it randomly
    .slice(0, bombsCount); // take *bombsCount* elements from it(15 in our case). it would be bombs indexes

  field.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    const index = getCellIndex(e.target);
    const column = index % width;
    const row = Math.floor(index / width);
    openCell(row, column);
  });

  function openCell(row, column) {
    const index = row * width + column;
    const cell = cells[index];
    cell.innerHTML = isBomb(index) ? 'X' : ' ';
    cell.disabled = true;
  }

  function isBomb(index) {
    // const index = row * width + col; // index of the cell in the array
    return bombs.includes(index);
  }

  // returns index of the cell in the "cells" array
  function getCellIndex(cell) {
    return cells.indexOf(cell);
  }
}


