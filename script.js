let [ms, sec, min, hr] = [0, 0, 0, 0];
let timerDisplay = document.getElementById("display");
let lapList = document.getElementById("lap-list");
let interval = null;
let running = false;

function formatTime(hr, min, sec, ms) {
  let h = hr < 10 ? "0" + hr : hr;
  let m = min < 10 ? "0" + min : min;
  let s = sec < 10 ? "0" + sec : sec;
  let milli = ms.toString().padStart(3, "0");
  return `${h}:${m}:${s}.${milli}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(hr, min, sec, ms);
}

function stopwatch() {
  ms += 10;
  if (ms >= 1000) {
    ms = 0;
    sec++;
    if (sec >= 60) {
      sec = 0;
      min++;
      if (min >= 60) {
        min = 0;
        hr++;
      }
    }
  }
  updateDisplay();
}

function startStop() {
  if (!running) {
    interval = setInterval(stopwatch, 10);
    running = true;
    document.querySelector(".buttons button:first-child").textContent = "Stop";
  } else {
    clearInterval(interval);
    running = false;
    document.querySelector(".buttons button:first-child").textContent = "Start";
  }
}

function resetTimer() {
  clearInterval(interval);
  [ms, sec, min, hr] = [0, 0, 0, 0];
  updateDisplay();
  lapList.innerHTML = "";
  running = false;
  document.querySelector(".buttons button:first-child").textContent = "Start";
}

function recordLap() {
  if (!running) return;
  const lapTime = formatTime(hr, min, sec, ms);
  const li = document.createElement("li");
  li.textContent = `Lap ${lapList.children.length + 1}: ${lapTime}`;
  lapList.appendChild(li);
}
