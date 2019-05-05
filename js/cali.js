function calendar(month) {
	//Variables to be used later.  Place holders right now.
	var padding = '';
	var totalFeb = '';
	var i = 1;
	var testing = '';

	var current = new Date();
	var cmonth = current.getMonth(); // current (today) month
	var day = current.getDate();
	var year = current.getFullYear();
	var tempMonth = month + 1; //+1; //Used to match up the current month with the correct start date.
	var prevMonth = month - 1;

	var hr = current.getHours();
	var min = current.getMinutes();
	//Add a zero in front of numbers<10
	if (min < 10) {
		min = '0' + min;
	}

	//Determing if Feb has 28 or 29 days in it.
	if (month == 1) {
		if ((year % 100 !== 0 && year % 4 === 0) || year % 400 === 0) {
			totalFeb = 29;
		} else {
			totalFeb = 28;
		}
	}

	// Setting up arrays for the name of the months, days, and the number of days in the month.
	var monthNames = [
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

	var totalDays = [
		'31',
		'' + totalFeb + '',
		'31',
		'30',
		'31',
		'30',
		'31',
		'31',
		'30',
		'31',
		'30',
		'31'
	];

	// Temp values to get the number of days in current month, and previous month. Also getting the day of the week.
	var tempDate = new Date(tempMonth + ' 1 ,' + year);
	var tempweekday = tempDate.getDay();
	var tempweekday2 = tempweekday;
	var dayAmount = totalDays[month];

	// After getting the first day of the week for the month, padding the other days for that week with the previous months days.  IE, if the first day of the week is on a Thursday, then this fills in Sun - Wed with the last months dates, counting down from the last day on Wed, until Sunday.
	while (tempweekday > 0) {
		padding += "<td class='premonth'></td>";
		//preAmount++;
		tempweekday--;
	}
	// Filling in the calendar with the current month days in the correct location along.
	while (i <= dayAmount) {
		// Determining when to start a new row
		if (tempweekday2 > 6) {
			tempweekday2 = 0;
			padding += '</tr><tr>';
		}

		// checking to see if i is equal to the current day, if so then we are making the color of that cell a different color using CSS. Also adding a rollover effect to highlight the day the user rolls over. This loop creates the actual calendar that is displayed.
		if (i == day && month == cmonth) {
			padding +=
				'<td class=\'currentday\'  onMouseOver=\'this.style.background="#292b2e"; this.style.color="#bc6ec5"\' onMouseOut=\'this.style.background="#292b2e"; this.style.color="#5d4d7a"\'>' +
				i +
				'</td>';
		} else {
			padding +=
				"<td class='currentmonth' onMouseOver='this.style.background=\"#292b2e\"' onMouseOut='this.style.background=\"#212026\"'>" +
				i +
				'</td>';
		}
		tempweekday2++;
		i++;
	}

	// Outputing the calendar onto the site.  Also, putting in the month name and days of the week.
	var calendarTable =
		"<table class='calendar'> <tr class='currentmonth'><th colspan='7'>" +
		monthNames[month] +
		', ' +
		year +
		'</th></tr>';
	calendarTable +=
		"<tr class='weekdays'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td> <td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
	calendarTable += '<tr>';
	calendarTable += padding;
	calendarTable += '</tr></table>';
	document.getElementById('calendar').innerHTML += calendarTable;
}

var current = new Date();
var cmonth = current.getMonth(); // current (today) month
calendar(cmonth);
