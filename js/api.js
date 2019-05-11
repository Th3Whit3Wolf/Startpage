'strict';

const M15 = 15 * 60 * 1000; // Fifteen Minutes
const H1 = 60 * 60 * 1000; // One Hour
const initiate = false; // To Clarify what getInformation is doing
const update = true; // To Clarify what getInformation is doing

const info_items = 6; // Must be even number

const weather_api_key = '// insert your api code here';
const locationUrl = 'https://www.geoip-db.com/json/';
const MAX_FETCH_RETRIES = 2;

const news_api_key = '// inser your api code here';
const news_source = 'google-news'; //  The identifer for the news source or blog you want headlines from
const news_topic = 'code'; // Keyword or phrase. Eg: find all articles containing the word 'Microsoft'.
const news_sort = 'latest'; // top | latest | popular
const news_endpoint = 'everything'; // everything | top-headlines
const news_lang = 'en'; // Language

const subreddit = 'rust'; // The subreddit you'd like to collect post from
const reddit_sort = 'top'; // relevance | hot | top | new | comments
const reddit_time = 'week'; // hour | day | week | month | year | all

const git_lang = 'rust'; // What Language you'd like to collect from
//const git_sort = 'stars'; // stars | forks | help-wanted-issues | updated [best match]
//const git_order = 'desc' // desc | asc [desc]

async function main() {
	loadLocal();
	setIntervalAsync(getInformation(update), M15, false);
}

// setInterval function that can deal with async
function setIntervalAsync(fn, interval_in_millis, console) {
	fn.then(() => {
		setTimeout(
			() => setIntervalAsync(fn, interval_in_millis, true),
			interval_in_millis
		);
		if (console == false) {
		} else {
			console.log('Finished waiting 15 minutes.');
		}
	});
}

async function getJson(url, id) {
	let json = null;
	let response = null;
	for (let i = 0; i < MAX_FETCH_RETRIES && json == null; i = ++i) {
		response = await fetch(url).catch(error => {
			console.error('Fetch Error for' + id + ': ', error);
			return {
				ok: false
			};
		});
		json = response.ok ? response.json() : null;
		console.log(id + ' is  okay');
	}
	return json;
}

async function setWeather(
	city_name,
	country_name,
	todayWeatherData,
	weatherData
) {
	const city = document.getElementById('city');
	city.textContent = `${city_name}, ${country_name}`;

	let today_temp = Math.round(todayWeatherData.main.temp);
	let today_temp_low = Math.round(todayWeatherData.main.temp_min);
	let today_temp_high = Math.round(todayWeatherData.main.temp_max);
	let today_description = todayWeatherData.weather[0].description;
	let weatherId = todayWeatherData.weather[0].id;

	weatherIcon(
		weatherId,
		today_temp,
		today_temp_high,
		today_temp_low,
		today_description
	);

	const d = new Date();
	const tomorrow = new Date();
	tomorrow.setDate(d.getDate() + 1);
	tomorrow.setHours(1, 0, 0, 0);
	day0 = +new Date(tomorrow.valueOf()) / 1000;

	// Sets arrays 0-3 & time 1-4
	for (let i = 1; i < 5; i = ++i) {
		window['day' + i] = window['day' + (i - 1)] + 86400;
		window['dy' + (i - 1)] = new Array();
	}

	let tod = d.getDay();
	getDays(tod);

	// Aggregates data and splits into Arrays
	for (i = 0; i < weatherData.cnt - 1; i = ++i) {
		if (weatherData.list[i].dt >= day0 && weatherData.list[i].dt < day1) {
			dy0.push(weatherData.list[i]);
		} else if (
			weatherData.list[i].dt >= day1 &&
			weatherData.list[i].dt < day2
		) {
			dy1.push(weatherData.list[i]);
		} else if (
			weatherData.list[i].dt >= day2 &&
			weatherData.list[i].dt < day3
		) {
			dy2.push(weatherData.list[i]);
		} else if (
			weatherData.list[i].dt >= day3 &&
			weatherData.list[i].dt < day4
		) {
			dy3.push(weatherData.list[i]);
		} else {
		}
	}

	// Gets and sets the weather ID, High, Low, & description for next 4 days
	// Also sets local storage
	for (let i = 0; i < 4; i = ++i) {
		window['weatherId' + i] = weatherID(window['dy' + i]);
		window['weatherHigh' + i] = maxTemp(window['dy' + i]);
		window['weatherLow' + i] = minTemp(window['dy' + i]);
		window['weatherDescription' + i] = description(window['dy' + i]);
		localStorage.setItem(`${window['weatherId' + i]}`, window['weatherId' + i]);
		localStorage.setItem(
			`${window['weatherHigh' + i]}`,
			window['weatherHigh' + i]
		);
		localStorage.setItem(
			`${window['weatherLow' + i]}`,
			window['weatherLow' + i]
		);
		localStorage.setItem(
			`${window['weatherDescription' + i]}`,
			window['weatherDescription' + i]
		);
		forecastIcon(
			window['weatherId' + i],
			i,
			window['weatherHigh' + i],
			window['weatherLow' + i],
			window['weatherDescription' + i]
		);
	}
}

// New Stiff
async function newsInitiate(newsData) {
	const news = document.getElementById('news-section');
	for (let i = 0; i < info_items; i = ++i) {
		if (newsData.articles[i].urlToImage == null) {
			news.innerHTML +=
				'<a href="' +
				newsData.articles[i].url +
				'" class="news-tab" id="news-' +
				i +
				'"><div class="news-left" style="background:url(' +
				'assets/icons/news.jpe' +
				'); background-size:cover; background-position:center; background-repeat:no-repeat;"></div><div class="news-right"><h6 class="news-title">' +
				newsData.articles[i].title +
				'</h6></div></a>';
		} else {
			news.innerHTML +=
				'<a href="' +
				newsData.articles[i].url +
				'" class="news-tab" id="news-' +
				i +
				'"><div class="news-left" style="background:url(' +
				newsData.articles[i].urlToImage +
				'); background-size:cover; background-position:center; background-repeat:no-repeat;"></div><div class="news-right"><h6 class="news-title">' +
				newsData.articles[i].title +
				'</h6></div></a>';
		}
	}
}

async function newsUpdate(newsData) {
	for (let i = 0; i < info_items; i = ++i) {
		var newsCards = document.getElementById('news-' + i);
		if (newsData.articles[i].urlToImage == null) {
			newsCards.innerHTML = '';
			newsCards.innerHTML +=
				'<a href="' +
				newsData.articles[i].url +
				'" class="news-tab" id="news-' +
				i +
				'"><div class="news-left" style="background:url(' +
				'assets/icons/news.jpe' +
				'); background-size:cover; background-position:center; background-repeat:no-repeat;"></div><div class="news-right"><h6 class="news-title">' +
				newsData.articles[i].title +
				'</h6></div></a>';
		} else {
			newsCards.innerHTML = '';
			newsCards.innerHTML +=
				'<a href="' +
				newsData.articles[i].url +
				'" class="news-tab" id="news-' +
				i +
				'"><div class="news-left" style="background:url(' +
				newsData.articles[i].urlToImage +
				'); background-size:cover; background-position:center; background-repeat:no-repeat;"></div><div class="news-right"><h6 class="news-title">' +
				newsData.articles[i].title +
				'</h6></div></a>';
		}
	}
}

// Reddit Stuff
async function redditsInitiate(rData) {
	const reddit = document.getElementById('reddit-section');
	for (var i = 1; i < info_items + 1; i = ++i) {
		if (rData.data.children[i].data.url.endsWith('.png')) {
			reddit.innerHTML +=
				'<a href=https://www.reddit.com' +
				rData.data.children[i].data.permalink +
				' class="reddit-tab" id="reddit-' +
				i +
				'"><div class="reddit-left" style="background:url(' +
				rData.data.children[i].data.url +
				'); background-size:cover; background-repeat:no-repeat;"></div><div class="reddit-right"><h6 class="reddit-title">' +
				rData.data.children[i].data.title +
				'</h6></div></a>';
		} else {
			reddit.innerHTML +=
				'<a href="' +
				rData.data.children[i].data.url +
				'" class="reddit-tab" id="reddit-' +
				i +
				'"><div class="reddit-left" style="background:url(assets/icons/reddit_logo.jpe); background-size:cover; background-position:center; background-repeat:no-repeat;"></div><div class="reddit-right"><h6 class="reddit-title">' +
				rData.data.children[i].data.title +
				'</h6></div></a>';
		}
	}
}

async function redditsUpdate(rData) {
	for (var i = 1; i < info_items + 1; i = ++i) {
		var redditCards = document.getElementById('reddit-' + i);
		if (rData.data.children[i].data.url.endsWith('.png')) {
			redditCards.innerHTML = '';
			redditCards.innerHTML +=
				'<a href=https://www.reddit.com' +
				rData.data.children[i].data.permalink +
				' class="reddit-tab" id="reddit-' +
				i +
				'"><div class="reddit-left" style="background:url(' +
				rData.data.children[i].data.url +
				'); background-size:cover; background-repeat:no-repeat;"></div><div class="reddit-right"><h6 class="reddit-title">' +
				rData.data.children[i].data.title +
				'</h6></div></a>';
		} else {
			redditCards.innerHTML = '';
			redditCards.innerHTML +=
				'<a href="' +
				rData.data.children[i].data.url +
				'" class="reddit-tab" id="reddit-' +
				i +
				'"><div class="reddit-left" style="background:url(assets/icons/reddit_logo.jpe); background-size:cover; background-position:center; background-repeat:no-repeat;"></div><div class="reddit-right"><h6 class="reddit-title">' +
				rData.data.children[i].data.title +
				'</h6></div></a>';
		}
	}
}

// Git Stuff
async function gitsInitiate(gitData) {
	const gits = document.getElementById('git-container');
	for (let i = 0; i < info_items / 2; i = ++i) {
		gits.innerHTML +=
			'<div class="git-card" id="github-' +
			i +
			'"><a href="' +
			gitData.items[i].html_url +
			'"><div class="git-card__image-container">' +
			'<img class="git-card__image"' +
			' src="' +
			gitData.items[i].owner.avatar_url +
			'" /></div>' +
			'<div class="git-card__content">' +
			'<h4 class="git-card__title">' +
			gitData.items[i].name
				.replace(/-/g, ' ')
				.replace(/\./g, ' ')
				.replace(/_/g, ' ') +
			'</h4>' +
			'<p class="git-description">' +
			gitData.items[i].description +
			'</p></div></a></div>';
	}
}

async function gitsUpdate(gitData) {
	for (let i = 0; i < info_items / 2; i = ++i) {
		var gitCards = document.getElementById('github-' + i);

		gitCards.innerHTML = '';
		gitCards.innerHTML +=
			'<a href="' +
			gitData.items[i].html_url +
			'"><div class="git-card__image-container">' +
			'<img class="git-card__image"' +
			' src="' +
			gitData.items[i].owner.avatar_url +
			'" /></div>' +
			'<div class="git-card__content">' +
			'<h4 class="git-card__title">' +
			gitData.items[i].name
				.replace(/-/g, ' ')
				.replace(/\./g, ' ')
				.replace(/_/g, ' ') +
			'</h4>' +
			'<p class="git-description">' +
			gitData.items[i].description +
			'</p></div></a></div>';
	}
}

async function loadLocal() {
	if (
		localStorage.getItem('city_name') &&
		localStorage.getItem('country_name') &&
		localStorage.getItem('postal') &&
		localStorage.getItem('country') &&
		localStorage.getItem('todayWeatherData') &&
		localStorage.getItem('weatherData') &&
		localStorage.getItem('gitData') &&
		localStorage.getItem('rData') &&
		localStorage.getItem('newsData')
	) {
		let city_name = localStorage.getItem('city_name');
		let country_name = localStorage.getItem('country_name');
		const city = document.getElementById('city');
		let gitData = JSON.parse(localStorage.getItem('gitData'));
		let rData = JSON.parse(localStorage.getItem('rData'));
		let newsData = JSON.parse(localStorage.getItem('newsData'));
		let todayWeatherData = JSON.parse(localStorage.getItem('todayWeatherData'));
		let weatherData = JSON.parse(localStorage.getItem('weatherData'));

		city.textContent = `${city_name}, ${country_name}`;
		gitsInitiate(gitData);
		redditsInitiate(rData);
		newsInitiate(newsData);
		setWeather(city_name, country_name, todayWeatherData, weatherData);
	} else {
		getInformation(initiate);
	}
}

async function getInformation(Update) {
	// Get Git information
	let gitUrl = `https://api.github.com/search/repositories?q=language:${git_lang}&order=desc`;
	if (
		typeof git_sort !== 'undefined' &&
		git_sort !== null &&
		git_sort.length > 0
	) {
		gitUrl = gitUrl + '&sort=' + git_sort;
	}
	if (
		typeof git_order !== 'undefined' &&
		git_order !== null &&
		git_order.length > 0
	) {
		gitUrl = gitUrl + '&order=' + git_sort;
	}
	gitData = await getJson(gitUrl, 'Github');

	// Get Reddit Information
	let redditUrl = `https://www.reddit.com/r/${subreddit}.json?`;
	if (
		typeof reddit_sort !== 'undefined' &&
		reddit_sort !== null &&
		reddit_sort.length > 0
	) {
		gitUrl = gitUrl + '&sort=' + reddit_sort;
	}
	if (
		typeof reddit_time !== 'undefined' &&
		reddit_time !== null &&
		reddit_time.length > 0
	) {
		gitUrl = gitUrl + '&t=' + reddit_time;
	}
	let rData = await getJson(redditUrl, 'Reddit');

	// Get News Information
	let newsUrl = `https://newsapi.org/v2/everything?sources=${news_source}&q=google&sortBy=${news_sort}&language=${news_lang}&apiKey=${news_api_key}`;
	let newsData = await getJson(newsUrl, 'News');

	// Get Weather Information
	let location = await getJson(locationUrl, 'Location');
	var city_name = location.city;
	var country_name = location.country_name;
	var postal = location.postal;
	var country = location.country_code;
	let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${postal},${country}&units=imperial&APPID=${weather_api_key}`;
	let todayWeatherData = await getJson(weatherUrl, 'Weather');
	let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${postal},${country}&units=imperial&APPID=${weather_api_key}`;
	let weatherData = await getJson(forecastUrl, 'Forecast');

	// Store data for faster load time
	localStorage.setItem('city_name', city_name);
	localStorage.setItem('country_name', country_name);
	localStorage.setItem('postal', postal);
	localStorage.setItem('country', country);
	localStorage.setItem('todayWeatherData', JSON.stringify(todayWeatherData));
	localStorage.setItem('weatherData', JSON.stringify(weatherData));
	localStorage.setItem('rData', JSON.stringify(rData));
	localStorage.setItem('newsData', JSON.stringify(newsData));
	localStorage.setItem('gitData', JSON.stringify(gitData));

	console.log(gitUrl);
	console.log(redditUrl);
	if (Update == true) {
		gitsUpdate(gitData);
		redditsUpdate(rData);
		newsUpdate(newsData);
		setWeather(city_name, country_name, todayWeatherData, weatherData);
	} else {
		gitsInitiate(gitData);
		redditsInitiate(rData);
		newsInitiate(newsData);
		setWeather(city_name, country_name, todayWeatherData, weatherData);
	}
}

main();
