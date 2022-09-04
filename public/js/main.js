const timerElement = document.querySelector('.timerStartStop');
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
const testTimer = new Timer(20)

function handleTimer() {
	testTimer.startTime = parseInt(document.querySelector('#timeSelect').value);
	timerDisplay.innerText = 'Minutes Left: ' + testTimer.startTime;
	decrementMinutes(testTimer.startTime);
}

function decrementMinutes() {
	console.log(testTimer);
	if (testTimer.startTime > 0) {
		if (testTimer.startTime  >= 10) {
			timerDisplay.innerText = 'Minutes Left: ' + testTimer.startTime;
			testTimer.startTime -= 1;
			setTimeout(decrementMinutes, 1000);
		} else {
			timerDisplay.innerText = 'Minutes Left: 0' + testTimer.startTime;
			testTimer.startTime -= 1;
			setTimeout(decrementMinutes, 10);
		}
	} else {
		timerDisplay.innerText = 'Minutes Left: 00';
		return;
	}
}

