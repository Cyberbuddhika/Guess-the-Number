"use strict";

// defining variables
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20; // Game start with score 20
let highscore = 0;

// Functions for change message text
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

//Function to change bg color when loosing
const loosingColors = function (score) {
  const colors = ["#f80000", "#ba0000", "#7c0000", "#3e0000", "#222"];
  for (let i = 0; i < colors.length; i++) {
    if (score === i + 1) {
      document.querySelector("body").style.backgroundColor = colors[i];
      break; // exit the loop once the condition is met
    }
  }
};

// Function to flash the screen when losing
const flashScreen = function () {
  const body = document.querySelector("body");
  if (body.style.backgroundColor === "red") {
    body.style.backgroundColor = "#222";
  } else {
    body.style.backgroundColor = "red";
  }
};

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No Number!");

    // When player wins
  } else if (guess == secretNumber) {
    displayMessage("🎉 Correct Number!");
    document.querySelector(".number").textContent = secretNumber;
    // chnaging body color when user wins. also increase secret number box width
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    //adding emoji explosion -- code by JoshuaKGoldberg
    for (let i = 0; i < 3; i++) {
      emojisplosion({
        emojis: ["🎉", "🎊"],
        uniqueness: 1,
      });
    }

    //Highscore condition
    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      displayMessage("💥 You lost the game!");
      document.querySelector(".score").textContent = 0;
      // Flash the screen when the player loses
      const flashing = setInterval(flashScreen, 100);
      setTimeout(function () {
        clearInterval(flashing);
      }, 1000);
    }
    loosingColors(score);
  }

  //defining Reset
  document.querySelector(".again").addEventListener("click", function () {
    score = 20;
    secretNumber = Math.trunc(Math.random() * 20) + 1;

    document.querySelector(".score").textContent = score;
    document.querySelector(".number").textContent = "?";
    displayMessage("Start guessing...");
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
    document.querySelector(".number").style.width = "15rem";
  });
});
