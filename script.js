const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let cells = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

// 🧩 Create board
function createBoard() {
  board.innerHTML = "";

  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;

    cell.addEventListener("click", handleClick);

    board.appendChild(cell);
  });
}

// 🎯 Handle click
function handleClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  // 🎨 Color
  if (currentPlayer === "X") {
    e.target.style.color = "#ff4d4d";
  } else {
    e.target.style.color = "#4d79ff";
  }

  // 🏆 Winner
  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;

    showBalloons(); // 🎈 animation

    return;
  }

  // 🤝 Draw
  if (!cells.includes("")) {
    statusText.textContent = "😅 It's a Draw!";
    gameActive = false;
    return;
  }

  // 🔁 Switch
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// 🏆 Check winner
function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] &&
           cells[a] === cells[b] &&
           cells[a] === cells[c];
  });
}

// 🔄 Reset
function resetGame() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's Turn";

  document.getElementById("balloons").innerHTML = "";

  createBoard();
}

// 🎈 Balloons function
function showBalloons() {
  const container = document.getElementById("balloons");

  for (let i = 0; i < 30; i++) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");

    balloon.style.left = Math.random() * 100 + "vw";

    const colors = ["red", "blue", "green", "yellow", "pink", "orange"];
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    balloon.style.animationDuration = (3 + Math.random() * 3) + "s";

    container.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 5000);
  }
}

// 🚀 Start game
createBoard();