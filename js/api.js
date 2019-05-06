'strict';

const info_items = 6; // Must be even number
const news_api_key = '// inser your api code here';

const weather_api_key = '// insert your api code here';
const locationUrl = 'https://www.geoip-db.com/json/';
const MAX_FETCH_RETRIES = 2;

const git_lang = 'rust';
const git_sort = 'stars';

const subreddit = 'rust';
const reddit_sort = 'setsuggestedsort';
const reddit_time = 'week'; //

async function main() {
	let fifteen_minutes_in_millis = 15 * 60 * 1000;
	let one_hour_in_millis = 60 * 60 * 1000;
	setIntervalAsync(setWeather, one_hour_in_millis);
	setIntervalAsync(getNews, fifteen_minutes_in_millis);
	setIntervalAsync(getReddits, fifteen_minutes_in_millis);
	setIntervalAsync(getGits, fifteen_minutes_in_millis);
}

// setInterval function that can deal with async
function setIntervalAsync(fn, interval_in_millis) {
	fn().then(() => {
		setTimeout(
			() => setIntervalAsync(fn, interval_in_millis),
			interval_in_millis
		);
	});
}

async function getUserLocation() {
	let json = await getJson(locationUrl);
	const city = document.getElementById('city');
	city.textContent = `${json.city}, ${json.country_name}`;
	return [json.country_code, json.postal];
}

async function getWeatherJson(country, postal, forecast) {
	if (forecast == false) {
		let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${postal},${country}&units=imperial&APPID=${weather_api_key}`;
		return await getJson(weatherUrl);
	} else {
		let weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${postal},${country}&units=imperial&APPID=${weather_api_key}`;
		return await getJson(weatherUrl);
	}
}

async function getNewsJson() {
	let newsUrl = `https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=${news_api_key}`;
	return await getJson(newsUrl);
}

async function getRedditsJson() {
	let redditUrl = `https://www.reddit.com/r/${subreddit}.json?sort=${reddit_sort}&t=week`;
	return await getJson(redditUrl);
}

async function getGitsJson() {
	let gitUrl = `https://api.github.com/search/repositories?q=language:${git_lang}&sort=${git_sort}&order=desc`;
	return await getJson(gitUrl);
}

async function getJson(url) {
	let json = null;
	let response = null;
	for (let i = 0; i < MAX_FETCH_RETRIES && json == null; i++) {
		response = await fetch(url).catch(error => {
			console.log('An error occured while fetching data!');
			console.error(error);
			return {
				ok: false
			};
		});
		json = response.ok ? response.json() : null;
	}
	return json;
}

async function getNews() {
	let newsData = await getNewsJson();
	var news = document.getElementById('news-section');
	for (var i = 0; i < info_items; i = i + 1) {
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

async function getReddits() {
	let rData = await getRedditsJson();
	var reddit = document.getElementById('reddit-section');
	for (var i = 1; i < info_items + 1; i = i + 1) {
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

async function getGits() {
	let gitData = await getGitsJson();
	var gits = document.getElementById('git-container');

	for (var i = 0; i < info_items / 2; i = i + 1) {
		gits.innerHTML +=
			'<div class="git-card id="github-' +
			i +
			'><a href="' +
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

async function setWeather() {
	let [country, postal] = await getUserLocation();
	forecast = false;
	let currentWeatherData = await getWeatherJson(country, postal, forecast);
	let current_temp = Math.round(currentWeatherData.main.temp);
	let today_temp_low = Math.round(currentWeatherData.main.temp_min);
	let today_temp_high = Math.round(currentWeatherData.main.temp_max);
	let tod_desc = currentWeatherData.weather[0].description;
	let weatherId = currentWeatherData.weather[0].id;
	weatherIcon(
		weatherId,
		current_temp,
		today_temp_high,
		today_temp_low,
		tod_desc
	);

	delete forecast;
	forecast = true;
	let weatherData = await getWeatherJson(country, postal, forecast);

	var d = new Date();
	const tomorrow = new Date();
	tomorrow.setDate(d.getDate() + 1);
	tomorrow.setHours(1, 0, 0, 0);
	dayt = +new Date(tomorrow.valueOf());
	dayt = dayt / 1000;
	var dyt = new Array();

	day1 = dayt + 86400;
	var dy1 = new Array();

	day2 = day1 + 86400;
	var dy2 = new Array();

	day3 = day2 + 86400;
	var dy3 = new Array();

	day4 = day3 + 86400;

	let tod = d.getDay();
	getDays(tod);

	for (i = 0; i < weatherData.cnt - 1; i++) {
		if (weatherData.list[i].dt >= dayt && weatherData.list[i].dt < day1) {
			dyt.push(weatherData.list[i]);
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
	var whichObject = 0;
	forecastIcon(
		weatherID(dyt),
		whichObject,
		maxTemp(dyt),
		minTemp(dyt),
		description(dyt)
	);
	var whichObject = whichObject + 1;
	forecastIcon(
		weatherID(dy1),
		whichObject,
		maxTemp(dy1),
		minTemp(dy1),
		description(dy1)
	);
	var whichObject = whichObject + 1;
	forecastIcon(
		weatherID(dy2),
		whichObject,
		maxTemp(dy2),
		minTemp(dy2),
		description(dy2)
	);
	var whichObject = whichObject + 1;
	forecastIcon(
		weatherID(dy3),
		whichObject,
		maxTemp(dy3),
		minTemp(dy3),
		description(dy3)
	);
}

main();
