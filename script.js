const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number: ", randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Write what the user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You Said:</div>
    <span class="box">${msg}</span>
  `;
}

// Check message against number
function checkNumber(msg) {
  const num = +msg;

  // Check if valid
  if (Number.isNaN(num)) {
    msgEl.innerHTML += "<div>That is not a valid number</div>";
    return;
  }

  // Check if in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }

  // Check Number
  if (num === randomNum) {
    document.body.innerHTML = `
      <h1 class="num">${num}</h1>
      <h2>Congratulations! You have guessed the correct number!</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += "<div>GO LOWER</div>";
  } else {
    msgEl.innerHTML += "<div>GO HIGHER</div>";
  }
}

// Generate a random number 1 - 100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SR service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", e => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
