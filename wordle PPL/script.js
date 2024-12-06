const secretCode = "52837"; // String digit rahasia
let currentRow = 0;
let attemptsLeft = 6;

const board = document.getElementById("board");
const input = document.getElementById("input");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("remaining");

// Membuat grid permainan
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 30; i++) { // 6 baris, 5 kolom
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }
}

// Mengecek tebakan
function checkGuess(guess) {
  const rowStart = currentRow * 5;
  const cells = document.querySelectorAll(".cell");
  
  for (let i = 0; i < 5; i++) {
    const cell = cells[rowStart + i];
    cell.textContent = guess[i];

    if (guess[i] === secretCode[i]) {
      cell.classList.add("correct");
    } else if (secretCode.includes(guess[i])) {
      cell.classList.add("present");
    } else {
      cell.classList.add("absent");
    }
  }

  if (guess === secretCode) {
    message.textContent = "🎉 Congratulations! You guessed the code!";
    endGame(true);
  } else {
    attemptsLeft--;
    attemptsDisplay.textContent = attemptsLeft;

    if (attemptsLeft === 0) {
      message.textContent = `❌ Game Over! The code was ${secretCode}`;
      endGame(false);
    } else {
      currentRow++;
    }
  }
}

// Validasi input untuk angka duplikat
function hasDuplicateDigits(number) {
  const digitSet = new Set();
  for (const digit of number) {
    if (digitSet.has(digit)) {
      return true; // Ada angka duplikat
    }
    digitSet.add(digit);
  }
  return false;
}

// Mengakhiri permainan
function endGame(success) {
  submitButton.disabled = true;
  input.disabled = true;
  retryButton.style.display = "inline-block";
}

// Mengatur ulang permainan
function resetGame() {
  currentRow = 0;
  attemptsLeft = 6;
  attemptsDisplay.textContent = attemptsLeft;
  input.value = "";
  input.disabled = false;
  submitButton.disabled = false;
  retryButton.style.display = "none";
  message.textContent = "";
  createBoard();
}

// Event listener tombol submit
submitButton.addEventListener("click", () => {
  const guess = input.value;

  if (guess.length !== 5 || isNaN(guess)) {
    message.textContent = "⚠️ Please enter exactly 5 digits.";
    return;
  }

  if (hasDuplicateDigits(guess)) {
    message.textContent = "⚠️ Digits must not repeat!";
    return;
  }

  checkGuess(guess);
  input.value = "";
});

// Event listener tombol retry
retryButton.addEventListener("click", resetGame);

// Inisialisasi permainan
createBoard();
