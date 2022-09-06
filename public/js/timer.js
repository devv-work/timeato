const timerStartStopBtn = document.querySelector('.timerStartStop');
timerStartStopBtn.addEventListener('click', handleStartButtonClick);
const timerDisplay = document.querySelector('.timerDisplay');
const timeSelect = document.querySelector('#timeSelect');

timeSelect.addEventListener('change', setTime);
timeSelect.addEventListener('change', stopTimer);

const listItems = document.querySelectorAll('.pomodoro__list-item');
listItem.addEventListener('click', setTagName)

// adds event listeners to all items in the pomodoro__list
listItems.forEach((listItem) => {
	listItem.addEventListener('click', setTagName);
});

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
	date: formatDate(),
};
const favIcon = document.getElementsByTagName('link')[2];
function setTime() {
	timerObject.focusTime = parseInt(
		document.querySelector('#timeSelect').value
	);
	timerObject.elapsedTime = 0;
	let duration = 60 * timerObject.focusTime;
	const [minutes, seconds] = calculateTimer(duration);
	displayTimer(minutes, seconds);
}

function setTime() {
	timerObject.focusTime = parseInt(
		document.querySelector('#timeSelect').value
	);
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
	timerObject.focusTime = parseInt(
		document.querySelector('#timeSelect').value
	);
	// timerObject.taskName = document.querySelector('#taskName').value;
	duration = 60 * (timerObject.focusTime - timerObject.elapsedTime / 60);
	if (duration < 0) {
		setTime();
	}
	if (timerObject.active === false) {
		console.log('Starting Timer');
		handleTimer(duration);
		timerObject.active = true;
	} else {
		console.log('Stopping Timer');
		handleTimer(duration, false);
		timerObject.active = false;
	}
}

/**
 * Name: handleTimer
 * Description: Run's setTimeout interval and displays time changes to DOM
 * @param duration - specifies the amount of time for each setTimeout iteration
 */
function handleTimer(duration) {
  updateTask();
	const intervalId = setInterval(function () {
		timerObject.elapsedTime = timerObject.elapsedTime + 1;
		console.log(timerObject.elapsedTime);
		[minutes, seconds] = calculateTimer(duration);
		displayTimer(minutes, seconds);
		if (--duration < 0) {
			clearInterval(intervalId);
			updateTimerObject();
		}
		if (timerObject.active === false) {
			clearInterval(intervalId);

			favIcon.href = './assets/favicon.jpg';
		}
	}, 1000); // <- Interval in ms
	console.log(favIcon.href);
	favIcon.href = './assets/favicon-timerstarted.jpg';
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

// Stops the timer.
function stopTimer(intervalId) {
	clearInterval(intervalId);
	favIcon.href = './assets/favicon-timerstarted.jpg';
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

// ########################## addTask Controller fetch #######################################

// On click of the start/stop button, run addTask
document.querySelectorAll('.timerStartStop').addEventListener('click', addTask)

// Send the timer object to the addTask controller through a json
async function updateTask() {

	try {
		const response = await fetch('task/updateTask', {
			method: 'put',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({

				// TaskSchema: taskName
				'taskName': timerObject.taskName,

				// SessionSchema: date
				'date': timerObject.date,

				// CycleSchema: focusTime
				'focusTime': timerObject.focusTime,

				// CycleSchema: breakTime
				'breakTime': timerObject.breakTime,
			})
		})
		const data = await response.json()
		console.log(data)
		location.reload()
	} catch (err) {
		console.log(err)
	}
}
