const timerElement = document.querySelector('.timer');
const timerDisplay = document.querySelector('.timerDisplay');
timerElement.addEventListener('click', handleTimer);

let tagList = ['work', 'study'];
class Timer {
	constructor(minutes) {
		(this.startTime = minutes), (this.elapsedTime = 0);
		// (this.breakTime = breakTime),
		// (this.tags = tagList);
	}
}
let minutes = 20;
let functionMinutes = minutes;
const testTimer = new Timer(minutes);

function handleTimer() {
	timerDisplay.innerText = 'Minutes Left: ' + testTimer.startTime;
	function decrementMinutes(inputStartTime) {
		if (testTimer.startTime >= 0) {
			if (testTimer.startTime >= 10) {
				timerDisplay.innerText = 'Minutes Left: ' + testTimer.startTime;
				testTimer.startTime -= 1;
			} else {
				timerDisplay.innerText =
					'Minutes Left: 0' + testTimer.startTime;
				testTimer.startTime -= 1;
			}
		} else {
			timerDisplay.innerText = 'Minutes Left: 00';
			return;
		}
	}
	decrementMinutes();
	if (testTimer.startTime >= 0) {
		setInterval(() => decrementMinutes(20), 100);
	}
	testTimer.startTime = functionMinutes;
	console.log(testTimer);
}
