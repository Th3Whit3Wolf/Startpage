# Startpage

My very unminimalistic startpage

![screenshot](screenshot.png)

## Features:

### <b>1.</b> Gets news from google news

- Configurable (via js/api.js)

### <b>2.</b> Gets weather

- Gets user location without prompt (I hate getting a prompt when reloading a page [It does use https])
- Weather icons move (sorry no gif)
- Weather Icons are pure CSS and Javascript
- Gets the next 4 days of weather (openweathermap made this unpleasant)
- Displays city, country of where it gets the location from

### <b>3.</b> Gets Popular Rust SubReddit Post this week

- Configurable (via js/api.js)
- If the post doesn't have an image it uses reddit icon

### <b>4.</b> Gets Currently Trending Rust programming language on Github

- Configurable (via js/api.js)

### <b>5.</b> Calendar is Dynamic

- It will automatically change the day, month, year
- Current day is circled

### <b>6.</b> Random programmer quote is awesome

- not an api, I made an array with quote from stormconsultancy, vim-startify, and some others I've found
- Because it's hardcoded it works when you don't have internet

### <b>7.</b> Quick Links

- Reddit, github(my repos), phoronix, & The Book are quickly accessible
- Configurable (via index.html)

### <b>8.</b> Search Engine

- Default is duckduck go but you change this (via index.html)
- Duckduckgo is privacy oriented, themeable, and has a more featureful query

### <b>9.</b> The Code

- Uses Vanilla Javascript with some async functions
- Reduced external calls as much as possible given what I was looking to do

### <b>10.</b> Colorscheme

- I did my best to cultivate a Spacemacs colorscheme (don't use Spacemacs, just like the aesthetic)

### <b>11.</b> Self-Updating

- Every 10 Minutes it updates the posts from Reddit, Github, Google News, and checks the weather again

### <b>12.</b> Greeting

- Will tell you Good {morning, afternoon, evening} based on the time
- If you want to change the user name edit line 32 of js/greeting.js

<b>From</b>

```javascript
greeting.textContent = `Good ${displayTimeOfDay()}, Doctor!`;
```

To whatever you'd like to be called.

You can also configure how many news items you get (via js/api.js)

- The variable is name info_items

- Number should be an even number between 2-24

## Credits:

[startpages](https://www.reddit.com/r/startpages/)

## Caution:

I designed this on Firefox:

I've tested on chromium

- Should be okay

I've test on surfer(webkit)

- Calendar for some reason only shows first week and incorrect days

I haven't tested on any other platform

## Todo

[ ] add cookies
[ ] integrate Tile Enhanced search and onclick functionality
