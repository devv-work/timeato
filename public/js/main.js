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
		this.date = dateHelper();
	}
}

// Creates a new timer
const timerObject = new Timer();

function startTimer(duration, display) {
	let timer = duration,
		minutes,
		seconds;
	const intervalId = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		display.innerText = minutes + ':' + seconds;
		if (--timer < 0) {
			clearInterval(intervalId);
			updateTimerObject();
			console.log(timerObject);
		}
	}, 1000);
}
function handleStartButtonClick() {
	// timerObject.taskName = document.querySelector('#taskName').value;
	timerObject.focusTime = parseInt(
		document.querySelector('#timeSelect').value
	);
	// timerObject.active ? isCountingDown(false) : isCountingDown(true);
	var time = 60 * document.querySelector('#timeSelect').value,
		display = document.querySelector('.timerDisplay');
	startTimer(time, display);
}
function formatDom() {
	if (timerObject.focusTime > 0) {
		if (timerObject.focusTime >= 10) {
			timerDisplay.innerText = 'Minutes Left: ' + timerObject.focusTime;
		} else {
			timerDisplay.innerText = 'Minutes Left: 0' + timerObject.focusTime;
		}
	} else {
		timerDisplay.innerText = 'Minutes Left: 00';
	}
}
// Adds information from most recent session to TimerObject, currently adds information correctly.
function updateTimerObject() {
	// +1 to Session
	timerObject.totalSessions += 1;
	// Every 4 rounds get a 15 minute break
	timerObject.totalSessions % 4 === 0
		? (timerObject.breakTime = 15)
		: (timerObject.breakTime = 5);
	timerObject.focusTime = parseInt(
		document.querySelector('#timeSelect').value
	);
	timerObject.totalFocusTime += timerObject.focusTime;
	// Pushes sessionInfo
	// {taskName:
	//  focusTime:
	//  breakTime:
	// 	}
	timerObject.sessionInfo.push({
		taskName: timerObject.taskName,
		focusTime: timerObject.focusTime,
		breakTime: timerObject.breakTime,
	});
}
