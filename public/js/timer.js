// DOM Elements
const timerStartStopBtn = document.querySelector('.timerStartStop');
const timerDisplay = document.querySelector('.timerDisplay');
const timeSelect = document.querySelector('#timeSelect');
const title = document.querySelector('.pomodoro__title');
const listItems = document.querySelectorAll('.pomodoro__list-item');

// Sounds
const startSound = new Audio('../assets/sounds/high-pitched-click.wav');
const stopSound = new Audio('../assets/sounds/wood-block.mp3');
const endSound = new Audio('../assets/sounds/software.wav');

// Events
timerStartStopBtn.addEventListener('click', () => {
  console.log(timerObject);
  timerObject.active ? stopSound.play() : startSound.play();
  handleStartButtonClick();
});
timeSelect.addEventListener('change', () => {
  resetTimer();
  setTime();
  console.log(timerObject);
});

listItems.forEach((listItem) => {
  listItem.addEventListener('click', setTagName);
});

// Declares intervalId globally, allowing for handleTimer to start and stop without a delay via clearInterval()
let intervalId;

// Defaults
let [minutes, seconds] = calculateTimer(1500);
displayTimer(minutes, seconds);
let duration = 1500;

const timerObject = {
  focusTime: 0,
  breakTime: 0,
  totalFocusTime: 0,
  active: false,
  taskName: 'general',
  totalSessions: 0,
  elapsedTime: 0,
  sessionInfo: [],
  date: new Date(),
};

const favIcon = document.getElementsByTagName('link')[2];
function setTime() {
  timerObject.focusTime = parseInt(document.querySelector('#timeSelect').value);
  timerObject.elapsedTime = 0;
  let duration = 60 * timerObject.focusTime;
  const [minutes, seconds] = calculateTimer(duration);
  displayTimer(minutes, seconds);
}

function setTime() {
  timerObject.focusTime = parseInt(document.querySelector('#timeSelect').value);
  timerObject.elapsedTime = 0;
  duration = 60 * timerObject.focusTime;
  const [minutes, seconds] = calculateTimer(duration);
  displayTimer(minutes, seconds);
}

/**
 * Name: handleStartButtonClick()
 * Description: On button click, assigns focusTime, declares duration of timer, and start timer
 *
 */

function handleStartButtonClick() {
  timerObject.focusTime = parseInt(document.querySelector('#timeSelect').value);
  duration = 60 * (timerObject.focusTime - timerObject.elapsedTime / 60);
  if (duration < 0) {
    setTime();
  }
  // update task in db
  updateTask();
  handleTimer(duration);
}

/**
 * Name: handleTimer
 * Description: Run's setTimeout interval and displays time changes to DOM
 * @param duration - specifies the amount of time for each setTimeout iteration
 */

function handleTimer(duration) {
  // Toggle active state
  timerObject.active = !timerObject.active;
  console.log(timerObject.active);
  if (timerObject.active) {
    changebuttonColor('red');
    handleCountdown();
  } else {
    changebuttonColor('white');
    clearInterval(intervalId);
    console.log('in else');
  }
}

function handleCountdown() {
  intervalId = setTimeout(handleCountdown, 1000);
  if (!timerObject.active) {
    clearInterval(intervalId);
  }
  timerObject.elapsedTime = timerObject.elapsedTime + 1;
  [minutes, seconds] = calculateTimer(duration);
  displayTimer(minutes, seconds);
  if (--duration < 0) {
    changebuttonColor('white');
    clearInterval(intervalId);
    displayTimer('00', '00');
    updateTimerObject();
  }
}

function resetTimer() {
  clearInterval(intervalId);
  updateTimerObject();
  updateTask();
  setTime();
  changebuttonColor('white');
  timerObject.active = false;
  timerObject.elapsedTime = 0;
  console.log(timerObject.active + 'line 136');
}

function changebuttonColor(color) {
  if (color === 'white') {
    favIcon.href = './assets/favicon.jpg';
    timerStartStopBtn.style.backgroundColor = 'white';
    timerStartStopBtn.style.boxShadow = '0 0.35rem #bbbbbb';
    timerStartStopBtn.style.color = 'black';
    timerStartStopBtn.classList.add('timerStartStopStopped');
    timerStartStopBtn.classList.remove('timerStartStopStarted');
  } else {
    // console.log({ location: 'timer.js', faviconhref: favIcon.href });
    favIcon.href = './assets/favicon-timerstarted.jpg';
    timerStartStopBtn.style.backgroundColor = '#ea5559';
    timerStartStopBtn.style.boxShadow = '0 0.35rem #9b3034';
    timerStartStopBtn.style.color = 'white';
    timerStartStopBtn.classList.add('timerStartStopStarted');
    timerStartStopBtn.classList.remove('timerStartStopStopped');
  }
}

/**
 * Name: calculateTimer
 * Description: Performs operations on timer variable and returns an array of [minutes, seconds]
 * @param timer- amount of time, in seconds
 */
function calculateTimer(timer) {
  let minutes = parseInt(timer / 60, 10);
  let seconds = parseInt(timer % 60, 10);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return [minutes, seconds];
}

/**
 * Name: displayTimer
 * Description: Updates DOM with time, updated every interval in startTimer()
 * @param minutes
 * @param seconds
 */
function displayTimer(minutes, seconds) {
  const display = document.querySelector('.timerDisplay');
  document.title = minutes + ':' + seconds;
  display.innerText = minutes + ':' + seconds;
}

/**
 * Name: displayTimer
 * Description: // Adds information from most recent session to TimerObject
 *
 */

function updateTimerObject() {
  // +1 to Session
  timerObject.totalSessions += 1;
  // Every 4 rounds get a 15 minute break
  timerObject.totalSessions % 4 === 0
    ? (timerObject.breakTime = 15)
    : (timerObject.breakTime = 5);
  // Accumulate totalFocusTime
  timerObject.totalFocusTime += timerObject.focusTime;
  // Store data about this session in our object
  timerObject.sessionInfo.push({
    taskName: timerObject.taskName,
    focusTime: timerObject.focusTime,
    breakTime: timerObject.breakTime,
  });
  console.log({ location: 'timer.js', timerObject });
}

// retrieves the text inside the list item that was clicked on
// and assigned that value to the takeName property of timerObject
function setTagName(e) {
  timerObject.taskName = e.target.innerText;
  title.innerText = e.target.innerText;
}

// ########################## addTask Controller fetch #######################################

// Send the timer object to the addTask controller through a json
async function updateTask() {
  console.log('inside updateTask method');
  try {
    const response = await fetch('task/updateTask', {
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        // passing timer properties to updateTask controller to update a users task in db
        taskName: timerObject.taskName,
        date: timerObject.date,
        focusTime: timerObject.focusTime,
        breakTime: timerObject.breakTime,
        elapsedTime: timerObject.elapsedTime,
      }),
    });
    const data = await response.json();
    console.table({ location: 'timer.js', data });
    location.reload();
  } catch (err) {
    console.log({ location: 'from fetch in timer.js', err });
  }
}
