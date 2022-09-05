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
