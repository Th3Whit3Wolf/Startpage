function Calendar(month, year) {
	var now = new Date();

	// labels for week days and months
	var days_labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		months_labels = [
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

	// test if input date is correct, instead use current month
	this.month = isNaN(month) || month == null ? now.getMonth() + 1 : month;
	this.year = isNaN(year) || year == null ? now.getFullYear() : year;

	var logical_month = this.month - 1;

	// get first day of month and first week day
	var first_day = new Date(this.year, logical_month, 1),
		first_day_weekday = first_day.getDay() == 0 ? 7 : first_day.getDay();

	// find number of days in month
	var month_length = new Date(this.year, this.month, 0).getDate(),
		previous_month_length = new Date(this.year, logical_month, 0).getDate();

	// calendar header
	var html = '<h2>' + months_labels[logical_month] + ' ' + this.year + '</h2>';

	// calendar content
	html += '<table class="calendar-table">';

	// week days labels row
	html += '<thead>';
	html += '<tr class="week-days">';
	for (var i = 0; i <= 6; i++) {
		html += '<th class="day">';
		html += days_labels[i];
		html += '</th>';
	}
	html += '</tr>';
	html += '</thead>';

	// define default day variables
	var day = 1, // current month days
		prev = 1, // previous month days
		next = 1; // next month days

	html += '<tbody>';
	html += '<tr class="week">';
	// weeks loop (rows)
	for (var i = 0; i < 9; i++) {
		// weekdays loop (cells)
		for (var j = 1; j <= 7; j++) {
			if (day <= month_length && (i > 0 || j >= first_day_weekday)) {
				// current month
				html += '<td class="day">';
				html += day;
				html += '</td>';
				day++;
			} else {
				if (day <= month_length) {
					// previous month
					html += '<td class="day other-month">';
					html += previous_month_length - first_day_weekday + prev + 1;
					html += '</td>';
					prev++;
				} else {
					// next month
					html += '<td class="day other-month">';
					html += next;
					html += '</td>';
					next++;
				}
			}
		}

		// stop making rows if it's the end of month
		if (day > month_length) {
			html += '</tr>';
			break;
		} else {
			html += '</tr><tr class="week">';
		}
	}
	html += '</tbody>';
	html += '</table>';

	return html;
}

// document.getElementById('calendar').innerHTML = Calendar(12, 2015);
document.getElementById('calendar').innerHTML = Calendar();
