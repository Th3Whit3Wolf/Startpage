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
	document.getElementById('clock').innerHTML = hr + ':' + min;

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	function displayTimeOfDay() {
		let time = new Date().getHours();
		if (time >= 0 && time <= 3) return 'evening';
		if (time >= 4 && time <= 11) return 'morning';
		if (time >= 12 && time <= 16) return 'afternoon';
		if (time >= 17 && time <= 24) return 'evening';
		console.log(time);
	}

	const greeting = document.getElementById('greeting');
	greeting.textContent = `Good ${displayTimeOfDay()}, Doctor!`;

	var time = setTimeout(function() {
		startTime();
	}, 1000);
}
