'use strict';

//Time and Date updater
function startTime() {
	var today = new Date();
	var hr = today.getHours();
	var min = today.getMinutes();
	//Add a zero in front of numbers<10
	if (min < 10) {
		min = '0' + min;
	}
	if (hr < 12) {
		document.getElementById('clock').innerHTML = hr + ':' + min + ' am';
	}
	if (hr >= 12) {
		if (hr >= 13) {
			hr = hr - 12;
		}
		document.getElementById('clock').innerHTML = hr + ':' + min + ' pm';
	}

	function displayTimeOfDay() {
		let time = new Date().getHours();
		if (time >= 0 && time <= 3) return 'Evening';
		if (time >= 4 && time <= 11) return 'Morning';
		if (time >= 12 && time <= 16) return 'Afternoon';
		if (time >= 17 && time <= 24) return 'Evening';
		console.log(time);
	}

	const greeting = document.getElementById('greeting');
	greeting.textContent = `Good ${displayTimeOfDay()}, Doctor!`;

	var time = setTimeout(function() {
		startTime();
	}, 1000);
}
