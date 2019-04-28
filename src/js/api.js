'strict';

const newscount = 6;
const weather_api_key = '';
const news_api_key = '';
const query = 'bitcoin';

const lat = '52.412857';
const lon = '0.751657';

// Weather Updater
//Get your own API Key from openweathermap.org
var url =
	'https://api.openweathermap.org/data/2.5/weather?lat=' +
	lat +
	'&lon=' +
	lon +
	'&appid=' +
	weather_api_key;

function convert(kelvin) {
	return Math.round((kelvin - 273.15) * 1.8 + 32);
}

fetch(url) // fetching weather
	.then(response => {
		return response.json();
	})
	.then(json => {
		// accesses the quote of the day from JSON API, and injects the quote and author into the HTML
		let temp = convert(json.main.temp);
		let temp_low = convert(json.main.temp_min);
		let temp_high = convert(json.main.temp_max);
		var tempHTML = document.getElementById('temp');
		var tempIconHTML = document.getElementById('temp-icon');
		var iconDescriptionHTML = document.getElementById('icon-description');
		tempHTML.innerHTML = temp + '<span>' + 'F' + '</span>';
		tempIconHTML.style =
			'background:url(https:' +
			out.current.condition.icon +
			') no-repeat center;';
		iconDescriptionHTML.innerHTML = out.current.condition.text;
	})
	.catch(err => {
		tempHTML = 'Input is ' + err;
	});

let news_url =
	'https://newsapi.org/v2/top-headlines?' +
	'country=us&' +
	'apiKey=' +
	news_api_key;

fetch(news_url)
	.then(res => res.json())
	.then(out => {
		var news = document.getElementById('news-section');
		for (var i = 0; i < newscount; i = i + 1) {
			news.innerHTML +=
				'<a href="' +
				out.articles[i].url +
				'" class="news-tab" id="news-' +
				i +
				'"><div class="news-left" style="background:url(' +
				out.articles[i].urlToImage +
				'); background-size:cover; background-repeat:no-repeat;"></div><div class="news-right"><h6 class="news-title">' +
				out.articles[i].title +
				'</h6></div></a>';
		}
	})
	.catch(err => {
		var news = document.getElementById('news-section');
		news.innerHTML =
			'<a href="#" class="news-tab" id="news-error"><div class="news-left"></div><div class="news-right"><h5 class="news-title">Error! Try refreshing after some time.</h5></div></a>';
		throw err;
	});

/*
fetch('json/quote.json') // fetching the quote of the day API
	.then(response => {
		return response.json();
	})
	.then(json => {
		// accesses the quote of the day from JSON API, and injects the quote and author into the HTML
		let qod = json;
		const quoteBox = document.querySelector('#qod p');
		const quoteCite = document.querySelector('cite');
		quoteBox.textContent = qod.quote;
		quoteCite.textContent = qod.author;
	})
	.catch(err => {
		const quoteBox = document.querySelector('#qod p');
		quoteBox.textContent = 'Error:' + err;
	});
*/
