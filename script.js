const gameContainer = document.getElementById("game");
let choice1 = null;
let choice2 = null;
let cardsFlipped = 0;
let noClick = false;
let score = 0;

const COLORS = [
  "#B14624", "#42331e", "#3d1c33", "#77477e", "#B6b160",
  "#A21a00", "#602749", "#130912", "#265c57", "#5a7e5a",
  "#B14624", "#42331e", "#3d1c33", "#77477e", "#B6b160",
  "#A21a00", "#602749", "#130912", "#265c57", "#5a7e5a"
];

function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color, "color"); // Add the "color" class here
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.appendChild(newDiv);
  }
}

function handleCardClick(e) {
  if (noClick) return;
  if (e.target.classList.contains("flipped")) return;

  const currentCard = e.target;
  const color = currentCard.classList[0];
  currentCard.style.backgroundColor = color; // Set the card's background color
  currentCard.classList.add("flipped");

  if (!choice1 || !choice2) {
    choice1 = choice1 || currentCard;
    choice2 = currentCard === choice1 ? null : currentCard;
  }

  if (choice1 && choice2) {
    noClick = true;
    if (choice1.className === choice2.className) {
      cardsFlipped += 2;
      choice1.removeEventListener("click", handleCardClick);
      choice2.removeEventListener("click", handleCardClick);
      choice1 = null;
      choice2 = null;
      noClick = false;
      score += 2;
      document.getElementById("counter-score").textContent = `Counter: ${score}`;
    } else {
      setTimeout(function () {
        choice1.style.backgroundColor = "";
        choice2.style.backgroundColor = "";
        choice1.classList.remove("flipped");
        choice2.classList.remove("flipped");
        choice1 = null;
        choice2 = null;
        noClick = false;
      }, 800);
    }
  }
  if (cardsFlipped === COLORS.length) {
    checkForGameCompletion();
  }
}

function checkForGameCompletion() {
  if (cardsFlipped === COLORS.length) {
    const modal = document.getElementById("modal");
    const scoreMessage = document.getElementById("score-message");
    const finalScore = document.getElementById("final-score");

    // Display the score and show the modal
    finalScore.textContent = score;
    modal.style.display = "block";
  }
}

function restartGame() {
  // Reset game variables
  choice1 = null;
  choice2 = null;
  cardsFlipped = 0;
  noClick = false;
  // Clear the game container
  gameContainer.innerHTML = "";
  // Reshuffle the colors
  shuffledColors = shuffle(COLORS);
  // Create new card elements
  createDivsForColors(shuffledColors);
  // Hide the restart modal
  const restartModal = document.getElementById("modal");
  restartModal.style.display = "none";
  // Update the score display if needed
  const counterScore = document.getElementById("counter-score");
  counterScore.textContent = `Counter: ${score}`;
}

function showConfirmationDialog() {
  const confirmationModal = document.getElementById("confirmation-modal");
  confirmationModal.style.display = "block";
  // Hide the restart modal
  const restartModal = document.getElementById("modal");
  restartModal.style.display = "none"; // Hide the modal
}

function resetScore() {
  //Reset score to 0
  score = 0;
  restartGame();
  // Hide the confirmation modal after resetting the score
  const confirmationModal = document.getElementById("confirmation-modal");
  confirmationModal.style.display = "none";
}

function keepScore() {
  restartGame();
  // Update the score display
  const counterScore = document.getElementById("counter-score");
  counterScore.textContent = `Counter: ${score}`;
  // Hide the confirmation modal after keeping the score and restarting
  const confirmationModal = document.getElementById("confirmation-modal");
  confirmationModal.style.display = "none";
}
createDivsForColors(shuffledColors);