startGame(10, 10, 12); // start game with width = 10, height = 10 and bombsCount = 12

function startGame(width, height, bombsCount) {
  const field = document.querySelector('.field');
  const cellsCount = width * height;
  field.innerHTML = '<button></button>'.repeat(cellsCount);
  const cells = [...field.children];
  let closedCellsCount = cellsCount;

  // create empty array 
  const bombs = [...Array(cellsCount).keys()]
    .sort(() => Math.random() - 0.5) // sort it randomly
    .slice(0, bombsCount); // take *bombsCount* elements from it(15 in our case). it would be bombs indexes

  field.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    const index = cells.indexOf(e.target);
    const column = index % width;
    const row = Math.floor(index / width);
    openCell(row, column);
  });

  // get bombs count near the cell
  function getBombsCount(row, column) {
    let count = 0;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (isBomb(row + y, column + x)) {
          count++;
        }
      }
    }

    return count;
  }

  function openCell(row, column) {
    if (!isValidCell(row, column)) return;

    const index = row * width + column;
    const cell = cells[index];

    if (cell.disabled === true) return;

    cell.disabled = true;

    if (isBomb(row, column)) {
      cell.innerHTML = 'X';
      alert('You lose!');
      return;
    }

    closedCellsCount--;
    if (closedCellsCount === bombsCount) {
      alert('You win!');
      return;
    }

    const bombsNearCellCount = getBombsCount(row, column);

    if (bombsNearCellCount) {
      cell.innerHTML = bombsNearCellCount;
      return;
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        openCell(row + y, column + x);
      }
    }
  }

  function isBomb(row, column) {
    if (!isValidCell(row, column)) return false;

    const index = row * width + column; // index of the cell in the array
    return bombs.includes(index);
  }

  function isValidCell(row, column) {
    return row >= 0 && row < height && column >= 0 && column < width;
  }
}


