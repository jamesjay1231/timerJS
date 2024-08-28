const hourInput = document.querySelector(".hour");
const minuteInput = document.querySelector(".minute");
const secondInput = document.querySelector(".second");
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");

function secondsTotalTime() {
  const hours = parseInt(hourInput.value) || 0;
  const minutes = parseInt(minuteInput.value) || 0;
  const seconds = parseInt(secondInput.value) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

function displayTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  hourInput.value = String(hours).padStart(2, "0");
  minuteInput.value = String(minutes).padStart(2, "0");
  secondInput.value = String(seconds).padStart(2, "0");
}

let timerInterval;
let totalTimeInSeconds = 0;
let isPaused = false;

function startTimer() {
  if (isPaused) {
    isPaused = false;
    return;
  }

  totalTimeInSeconds = secondsTotalTime();

  if (totalTimeInSeconds <= 0) {
    alert("시간을 입력해주세요.");
    return;
  }

  startButton.textContent = "PAUSE";

  timerInterval = setInterval(() => {
    if (totalTimeInSeconds > 0) {
      totalTimeInSeconds--;
      displayTime(totalTimeInSeconds);
    } else {
      clearInterval(timerInterval);
      resetTimer();
      alert("Finish");
    }
  }, 1000);
}
function pauseTimer() {
  clearInterval(timerInterval);
  isPaused = true;
  startButton.textContent = "START";
  startTimer();
}

function resetTimer() {
  clearInterval(timerInterval);
  isPaused = false;
  totalTimeInSeconds = 0;
  displayTime(totalTimeInSeconds);
  startButton.textContent = "START";
}

startButton.addEventListener("click", () => {
  if (isPaused || startButton.textContent === "PAUSE") {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetButton.addEventListener("click", resetTimer);
