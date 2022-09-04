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
function handleTimer() {
	let minutes = 20;
	// let breakTime = prompt('How long are breaks?')
	const testTimer = new Timer(minutes);
	timerDisplay.innerText = 'Minutes Left: ' + testTimer.startTime;
	function decrementMinutes() {
		if (testTimer.startTime >= 0) {
			timerDisplay.innerText = 'Minutes Left: ' + testTimer.startTime;
			testTimer.startTime -= 1;
		} else {
			timerDisplay.innerText = 'Minutes Left: 0';
			return;
		}
	}
	decrementMinutes();
	setInterval(decrementMinutes, 1000);
	console.log(testTimer);
}
