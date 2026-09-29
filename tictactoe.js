// State variables to track game progression
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Select elements from the DOM
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector("#status");
const resetBtn = document.querySelector("#reset-btn");

// All 8 possible winning combinations (3 rows, 3 columns, 2 diagonals)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handles clicks on individual cells
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    // Guard clause: stop if cell is taken or game is over
    if (board[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    // Update board state array and UI
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkForResults();
}

// Scans board array to check for a winner or a draw
function checkForResults() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === "" || board[b] === "" || board[c] === "") {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} Wins! 🎉`;
        isGameActive = false;
        return;
    }

    // If no cells are left empty and nobody won, it's a draw
    const roundDraw = !board.includes("");
    if (roundDraw) {
        statusDisplay.innerText = "Game ended in a draw! 🤝";
        isGameActive = false;
        return;
    }

    // Swap players if the match is ongoing
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
}

// Resets internal state variables and UI layout back to defaults
function resetGame(e) {
    if (e) e.preventDefault(); // Prevents accidental page reloads
    
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("x", "o");
    });
}

// Bind interactivity events to DOM elements
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);