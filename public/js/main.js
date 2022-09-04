// Start/Stop button
const timerStartStopBtn = document.querySelector('.timerStartStop');
// Event Listener for click
timerStartStopBtn.addEventListener('click', handleTimer);
// Display with 'Minutes Left: _____"
const timerDisplay = document.querySelector('.timerDisplay');
// Defines a class for timer, if we want to add methods/properties in mongoDb our schema is 
class Timer {
	constructor() {
		(this.startTime = 0), (this.elapsedTime = 0);
	}
}

// Creates a timer upon page load
const testTimer = new Timer(0)

// Grabs the selected time from dropdown, assigns it to startTime in our Timer. 
// Updates 'Minutes Left: ___" with appropriate number
// Calls decrementMinutes
function handleTimer() {
	testTimer.startTime = parseInt(document.querySelector('#timeSelect').value);
	timerDisplay.innerText = 'Minutes Left: ' + testTimer.startTime;
	decrementMinutes(testTimer.startTime);
}

// Might pull apart this function into smaller ones, but essentially it checks for the current time remaining, 
//	if it is >=10 it will append it to the 'Minutes Left:' normally,
//	  if it is <10 it will add a leading 0 (so it is always two digits like a clock), 
//		  finally if it is 0 it will alert 'FINISHED' and redeclare testTimer.startTime to stop the loop.
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
		alert('FINISHED')
		testTimer.startTime = parseInt(document.querySelector('#timeSelect').value)
	}
}

