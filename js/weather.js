function sun_shower(whichObject) {
	console.log('sun_shower');
	console.log('Icons has been added to ' + whichObject);
	document.querySelector(
		'div[data-element=icon_Obj' + whichObject + ']'
	).className = 'icon sun-shower';
	document.querySelector(
		'div[data-element=a_Obj' + whichObject + ']'
	).className = 'cloud';
	document.querySelector(
		'div[data-element=a_a_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=b_Obj' + whichObject + ']'
	).className = 'sun';
	document.querySelector(
		'div[data-element=b_a_Obj' + whichObject + ']'
	).className = 'rays';
	document.querySelector(
		'div[data-element=b_b_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=c_Obj' + whichObject + ']'
	).className = 'rain';
}
function thunder_storm(whichObject) {
	console.log('thunder_storm');
	console.log('Icons has been added to ' + whichObject);
	document.querySelector(
		'div[data-element=icon_Obj' + whichObject + ']'
	).className = 'icon thunder-storm';
	document.querySelector(
		'div[data-element=a_Obj' + whichObject + ']'
	).className = 'cloud';
	document.querySelector(
		'div[data-element=a_a_Obj' + whichObject + ']'
	).className = 'cloud';
	document.querySelector(
		'div[data-element=b_Obj' + whichObject + ']'
	).className = 'lightning';
	document.querySelector(
		'div[data-element=b_a_Obj' + whichObject + ']'
	).className = 'bolt';
	document.querySelector(
		'div[data-element=b_b_Obj' + whichObject + ']'
	).className = 'bolt';
	document.querySelector(
		'div[data-element=c_Obj' + whichObject + ']'
	).className = '';
}
function cloudy(whichObject) {
	console.log('cloudy');
	console.log('Icons has been added to ' + whichObject);
	document.querySelector(
		'div[data-element=icon_Obj' + whichObject + ']'
	).className = 'icon cloudy';
	document.querySelector(
		'div[data-element=a_Obj' + whichObject + ']'
	).className = 'cloud';
	document.querySelector(
		'div[data-element=a_a_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=b_Obj' + whichObject + ']'
	).className = 'cloud';
	document.querySelector(
		'div[data-element=b_a_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=b_b_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=c_Obj' + whichObject + ']'
	).className = '';
}
function flurries(whichObject) {
	console.log('flurries');
	console.log('Icons has been added to ' + whichObject);
	document.querySelector(
		'div[data-element=icon_Obj' + whichObject + ']'
	).className = 'icon flurries';
	document.querySelector(
		'div[data-element=a_Obj' + whichObject + ']'
	).className = 'cloud';
	document.querySelector(
		'div[data-element=a_a_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=b_Obj' + whichObject + ']'
	).className = 'snow';
	document.querySelector(
		'div[data-element=b_a_Obj' + whichObject + ']'
	).className = 'flake';
	document.querySelector(
		'div[data-element=b_b_Obj' + whichObject + ']'
	).className = 'flake';
	document.querySelector(
		'div[data-element=c_Obj' + whichObject + ']'
	).className = '';
}
function sunny(whichObject) {
	console.log('sunny');
	console.log('Icons has been added to ' + whichObject);
	document.querySelector(
		'div[data-element=icon_Obj' + whichObject + ']'
	).className = 'icon sunny';
	document.querySelector(
		'div[data-element=a_Obj' + whichObject + ']'
	).className = 'sun';
	document.querySelector(
		'div[data-element=a_a_Obj' + whichObject + ']'
	).className = 'rays';
	document.querySelector(
		'div[data-element=b_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=b_a_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=b_b_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=c_Obj' + whichObject + ']'
	).className = '';
}
function rainy(whichObject) {
	console.log('rainy');
	console.log('Icons has been added to ' + whichObject);
	document.querySelector(
		'div[data-element=icon_Obj' + whichObject + ']'
	).className = 'icon rainy';
	document.querySelector(
		'div[data-element=a_Obj' + whichObject + ']'
	).className = 'cloud';
	document.querySelector(
		'div[data-element=a_a_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=b_Obj' + whichObject + ']'
	).className = 'rain';
	document.querySelector(
		'div[data-element=b_a_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=b_b_Obj' + whichObject + ']'
	).className = '';
	document.querySelector(
		'div[data-element=c_Obj' + whichObject + ']'
	).className = '';
}

function weatherIcon(weatherId, temp, max_temp, min_temp, desc) {
	if (weatherId >= 200 && weatherId < 300) {
		thunder_storm('Today');
	} else if (weatherId >= 300 && weatherId < 600) {
		rainy('Today');
	} else if (weatherId >= 600 && weatherId < 670) {
		flurries('Today');
	} else if (weatherId >= 801 && weatherId < 900) {
		cloudy('Today');
	} else {
		sunny('Today');
	}
	document.querySelector('div.Text.ObjToday').innerHTML =
		'<span class="first-word">Now </span>' + temp + '°F';
	document.querySelector('div.Text1.ObjTodayH').innerHTML =
		'<span class="first-word">High </span>' + max_temp + '°F';
	document.querySelector('div.Text2.ObjTodayL').innerHTML =
		'<span class="first-word">Low </span>' + min_temp + '°F';
	document.querySelector('div.Text3.ObjTodayD').innerHTML = desc;
}

function forecastIcon(weatherId, whichObject, max_temp, min_temp, desc) {
	if (weatherId >= 200 && weatherId < 300) {
		thunder_storm(whichObject);
	} else if (weatherId >= 300 && weatherId < 600) {
		rainy(whichObject);
	} else if (weatherId >= 600 && weatherId < 670) {
		flurries(whichObject);
	} else if (weatherId >= 801 && weatherId < 900) {
		cloudy(whichObject);
	} else {
		sunny(whichObject);
	}
	document.querySelector('div.Text1.Obj' + whichObject + 'H').innerHTML =
		'<span class="first-word">High </span>' + max_temp + '°F';
	document.querySelector('div.Text2.Obj' + whichObject + 'L').innerHTML =
		'<span class="first-word">Low </span>' + min_temp + '°F';
	document.querySelector('div.Text3.Obj' + whichObject + 'D').innerHTML = desc;
}

function maxTemp(arr) {
	let max_temp = new Array();
	for (i = 0; i < arr.length - 1; i++) {
		max_temp.push(arr[i].main.temp_max);
	}
	var largest = Math.max.apply(Math, max_temp);
	return Math.round(largest);
}
function minTemp(arr) {
	let min_temp = new Array();
	for (i = 0; i < arr.length - 1; i++) {
		min_temp.push(arr[i].main.temp_min);
	}
	var smallest = Math.min.apply(Math, min_temp);
	return Math.round(smallest);
}

function weatherID(arr) {
	let wID = new Array();
	for (i = 0; i < arr.length - 1; i++) {
		wID.push(arr[i].weather[0].id);
	}
	var weather = mode(wID);
	return weather;
}

function description(arr) {
	let desc = new Array();
	for (i = 0; i < arr.length - 1; i++) {
		desc.push(arr[i].weather[0].description);
	}
	var description = mode(desc);
	return description;
}

function mode(arr) {
	return arr
		.sort(
			(a, b) =>
				arr.filter(v => v === a).length - arr.filter(v => v === b).length
		)
		.pop();
}

function getDays(today) {
	const dayNames = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	const dayStyle = [
		'5.25rem',
		'5.25rem',
		'5rem',
		'4rem',
		'4.5rem',
		'5.25rem',
		'4.5rem'
	];
	if (today <= 2) {
		document.querySelector('div.title.Day1').innerHTML = dayNames[today + 2];
		document.querySelector('div.title.Day1').style.left = dayStyle[today + 2];
		document.querySelector('div.title.Day2').innerHTML = dayNames[today + 3];
		document.querySelector('div.title.Day2').style.left = dayStyle[today + 3];
		document.querySelector('div.title.Day3').innerHTML = dayNames[today + 4];
		document.querySelector('div.title.Day3').style.left = dayStyle[today + 4];
	} else if (today == 3) {
		document.querySelector('div.title.Day1').innerHTML = dayNames[5];
		document.querySelector('div.title.Day1').style.left = dayStyle[5];
		document.querySelector('div.title.Day2').innerHTML = dayNames[6];
		document.querySelector('div.title.Day2').style.left = dayStyle[6];
		document.querySelector('div.title.Day3').innerHTML = dayNames[0];
		document.querySelector('div.title.Day3').style.left = dayStyle[0];
	} else if (today == 4) {
		document.querySelector('div.title.Day1').innerHTML = dayNames[6];
		document.querySelector('div.title.Day1').style.left = dayStyle[6];
		document.querySelector('div.title.Day2').innerHTML = dayNames[0];
		document.querySelector('div.title.Day2').style.left = dayStyle[0];
		document.querySelector('div.title.Day3').innerHTML = dayNames[1];
		document.querySelector('div.title.Day3').style.left = dayStyle[1];
	} else if (today == 5) {
		document.querySelector('div.title.Day1').innerHTML = dayNames[0];
		document.querySelector('div.title.Day1').style.left = dayStyle[0];
		document.querySelector('div.title.Day2').innerHTML = dayNames[1];
		document.querySelector('div.title.Day2').style.left = dayStyle[1];
		document.querySelector('div.title.Day3').innerHTML = dayNames[2];
		document.querySelector('div.title.Day3').style.left = dayStyle[2];
	} else {
		document.querySelector('div.title.Day1').innerHTML =
			dayNames[today + 2 - 7];
		document.querySelector('div.title.Day1').style.left =
			dayStyle[today + 2 - 7];
		document.querySelector('div.title.Day2').innerHTML =
			dayNames[today + 3 - 7];
		document.querySelector('div.title.Day2').style.left =
			dayStyle[today + 3 - 7];
		document.querySelector('div.title.Day3').innerHTML =
			dayNames[today + 4 - 7];
		document.querySelector('div.title.Day3').style.left =
			dayStyle[today + 4 - 7];
	}
}
