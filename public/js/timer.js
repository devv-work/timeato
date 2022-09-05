const timerStartStopBtn = document.querySelector('.timerStartStop');
timerStartStopBtn.addEventListener('click', handleStartButtonClick);
const timerDisplay = document.querySelector('.timerDisplay');
const timeSelect = document.querySelector('#timeSelect');
const listItems = document.querySelectorAll('.pomodoro__list-item')

// adds event listeners to all items in the pomodoro__list
listItems.forEach(listItem => {

  listItem.addEventListener('click', setTagName)

})

const timerObject = {
	focusTime: 0,
	breakTime: 0,
	totalFocusTime: 0,
	active: false,
	taskName: null,
	totalSessions: 0,
	sessionInfo: [],
	date: formatDate(),
};

/**
 * Name: handleStartButtonClick()
 * Description: On button click, assigns focusTime, declares duration of timer, and start timer
 *
 */
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

/**
 * Name: startTimer
 * Description: Run's setTimeout interval and displays time changes to DOM
 * @param duration - specifies the amount of time for each setTimeout iteration
 */
function startTimer(duration) {
	const intervalId = setInterval(function () {
		const [minutes, seconds] = calculateTimer(duration);
		displayTimer(minutes, seconds);
		if (--duration < 0) {
			stopTimer(intervalId);
			updateTimerObject();
		}
	}, 1); // <- Interval in ms
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

// retrieves the text inside the list item that was clicked on
// and assigned that value to the takeName property of timerObject
function setTagName(e) {

  timerObject.taskName = e.target.innerText;

}