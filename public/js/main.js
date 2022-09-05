// Start/Stop button
const timerStartStopBtn = document.querySelector('.timerStartStop');
// Event Listener for click
timerStartStopBtn.addEventListener('click', handleStartButtonClick);
// Display with 'Minutes Left: _____"
const timerDisplay = document.querySelector('.timerDisplay');
const timeSelect = document.querySelector('#timeSelect');
// Defines class for Timer
class Timer {
	constructor() {
		(this.focusTime = 0),
			(this.breakTime = 0),
			(this.totalFocusTime = 0), //---> timeSpent in DB && totalFocusTime
			(this.taskName = null),
			(this.totalSessions = 0), // ---> amountOfSessions in DB
			(this.sessionInfo = []);
		this.date = formatDate();
	}
}
// Creates a new timer
const timerObject = new Timer();

// Starts the timer, also calls on displayTimer to update DOM upon run.
function handleStartButtonClick() {
	// timerObject.taskName = document.querySelector('#taskName').value;
	// !!! ^ This will need to be refactored to accept button clicks on our tag options, was originally a text input.
	// Assigns the current timer duration to timerObject
	timerObject.focusTime = parseInt(
		document.querySelector('#timeSelect').value
	);
	// Convert the minutes selected to seconds
	let duration = 60 * timerObject.focusTime;
	// Pass seconds into startTimer
	startTimer(duration);
}

function startTimer(duration) {
	let timer = duration,
		minutes,
		seconds;
	// Most complicated part, on an interval of 1000ms, display to the DOM the result of calculateTimer. Updates on the interval given so at 1000ms it will calculate the timer value and update DOM every second.
	const intervalId = setInterval(function () {
		displayTimer(
			calculateTimer(timer, minutes, seconds)[0],
			calculateTimer(timer, minutes, seconds)[1]
		);
		// If the timer value is === 0
		if (--timer < 0) {
			stopTimer(intervalId);
			updateTimerObject();
		}
	}, 1000);
}

// Helper function to calculate the specific minutes/seconds of the timer, returns an array used in displayTimer.
function calculateTimer(timer, minutes, seconds) {
	minutes = parseInt(timer / 60, 10);
	seconds = parseInt(timer % 60, 10);
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	return [minutes, seconds];
}

// Loads timer information onto the DOM, passed in as indexes from an array.
function displayTimer(minutes, seconds) {
	const display = document.querySelector('.timerDisplay');
	display.innerText = minutes + ':' + seconds;
}

// Stops the timer, updates the object with this session's information.
function stopTimer(intervalId) {
	clearInterval(intervalId);
}

// Adds information from most recent session to TimerObject, currently adds information correctly.
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
