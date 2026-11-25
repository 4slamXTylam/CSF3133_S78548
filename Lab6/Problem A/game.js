// Game state: scores and results from every round.
let playerName = "";
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let results = [];
let roundNumber = 0;

// Start the game after checking the player's name.
function startGame() {
  const nameInput = document.getElementById("playerName");
  const name = nameInput.value.trim();

  if (name === "") {
    alert("Please enter your name.");
    nameInput.focus();
    return;
  }

  playerName = name;
  gameStarted = true;
  document.getElementById("welcome").textContent = `Welcome, ${playerName}!`;
  document.getElementById("startTime").textContent =
    "Game started at: " + new Date().toLocaleString();
  document.getElementById("result").textContent = "Choose Rock, Paper or Scissors.";
  document.getElementById("result").className = "result-message";
}

// Return a random computer choice.
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

// Play one round and update the screen, score and history.
function playRound(playerChoice) {
  if (!gameStarted) {
    alert("Click Start Game first.");
    return;
  }

  const computerChoice = getComputerChoice();
  let outcome;

  if (playerChoice === computerChoice) {
    outcome = "Draw";
    draws++;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    outcome = "Win";
    wins++;
  } else {
    outcome = "Lose";
    losses++;
  }

  roundNumber++;
  document.getElementById("playerImg").src = `${playerChoice}.png`;
  document.getElementById("computerImg").src = `${computerChoice}.png`;
  document.getElementById("playerImg").alt = `Your choice: ${playerChoice}`;
  document.getElementById("computerImg").alt = `Computer choice: ${computerChoice}`;
  document.getElementById("playerChoice").textContent = playerChoice;
  document.getElementById("computerChoice").textContent = computerChoice;

  const resultElement = document.getElementById("result");
  resultElement.textContent = outcome === "Draw"
    ? "It is a draw!"
    : outcome === "Win" ? `${playerName} wins this round!` : "Computer wins this round!";
  resultElement.className = `result-message ${outcome.toLowerCase()}`;

  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("draws").textContent = draws;

  results.push(outcome);
  const row = document.createElement("tr");
  row.innerHTML = `<td>${roundNumber}</td><td>${playerChoice}</td>` +
    `<td>${computerChoice}</td><td>${outcome}</td>`;
  document.querySelector("#history tbody").appendChild(row);
}

// Count the results and display the total rounds and win percentage.
function showSummary() {
  const total = results.length;
  const percentage = total === 0 ? 0 : Math.round((wins / total) * 100);
  document.getElementById("summary").textContent =
    `You played ${total} rounds and won ${percentage}%.`;
}

// Reset all game data and clear the page.
function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  results = [];
  roundNumber = 0;
  gameStarted = false;
  playerName = "";

  document.getElementById("playerName").value = "";
  document.getElementById("welcome").textContent = "";
  document.getElementById("startTime").textContent = "";
  document.getElementById("playerImg").src = "rock.png";
  document.getElementById("computerImg").src = "rock.png";
  document.getElementById("playerChoice").textContent = "Waiting...";
  document.getElementById("computerChoice").textContent = "Waiting...";
  document.getElementById("result").textContent = "Start the game to play.";
  document.getElementById("result").className = "result-message";
  document.getElementById("wins").textContent = "0";
  document.getElementById("losses").textContent = "0";
  document.getElementById("draws").textContent = "0";
  document.querySelector("#history tbody").innerHTML = "";
  document.getElementById("summary").textContent = "";
}
