const timerStartStopBtn = document.querySelector('.timerStartStop');
timerStartStopBtn.addEventListener('click', handleStartButtonClick);
const timerDisplay = document.querySelector('.timerDisplay');
const timeSelect = document.querySelector('#timeSelect');
timeSelect.addEventListener('change', setTime);

const timerObject = {
	focusTime: 0,
	breakTime: 0,
	totalFocusTime: 0,
	active: false,
	taskName: null,
	totalSessions: 0,
	elapsedTime: 0,
	sessionInfo: [],
	date: formatDate(),
};

function setTime() {
	timerObject.focusTime = parseInt(
		document.querySelector('#timeSelect').value
	);
	let duration = 60 * timerObject.focusTime;
	const [minutes, seconds] = calculateTimer(duration);
	displayTimer(minutes, seconds);
}

/**
 * Name: handleStartButtonClick()
 * Description: On button click, assigns focusTime, declares duration of timer, and start timer
 *
 */
function handleStartButtonClick() {
	// timerObject.taskName = document.querySelector('#taskName').value;
	let duration = 60 * (timerObject.focusTime - timerObject.elapsedTime / 60);
	if (timerObject.active === false) {
		console.log('Starting Timer');
		startTimer(duration);
		timerObject.active = true;
	} else {
		console.log('Stopping Timer');
		startTimer(duration, false);
		timerObject.active = false;
	}
}

/**
 * Name: startTimer
 * Description: Run's setTimeout interval and displays time changes to DOM
 * @param duration - specifies the amount of time for each setTimeout iteration
 */

function startTimer(duration) {
	const intervalId = setInterval(function () {
		timerObject.elapsedTime = timerObject.elapsedTime + 1;
		console.log(timerObject.elapsedTime);
		const [minutes, seconds] = calculateTimer(duration);
		displayTimer(minutes, seconds);
		if (--duration < 0) {
			clearInterval(intervalId);
			updateTimerObject();
		}
		if (timerObject.active === false) {
			clearInterval(intervalId);
		}
	}, 1000); // <- Interval in ms
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
	display.innerText = minutes + ':' + seconds;
}

// Stops the timer.
function stopTimer(intervalId) {
	clearInterval(intervalId);
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
	console.log(timerObject);
}

// Converts Date() to mm/dd/yyyy format
function formatDate() {
	const today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();
	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;
	const formattedToday = mm + '/' + dd + '/' + yyyy;
	return formattedToday;
}
// Test
