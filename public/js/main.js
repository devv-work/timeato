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
