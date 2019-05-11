const CONFIG = {
	commands: [
		{
			name: 'DuckDuckGo',
			key: '*',
			url: 'https://duckduckgo.com',
			search: '/?q={}',
			color: '#292b2e'
		},
		{
			name: 'Mail',
			key: 'm',
			url: 'https://gmail.com',
			search: '/#search/text={}',
			color: 'linear-gradient(135deg, #dd5145, #dd5145)',
			quickLaunch: true
		},
		{
			name: 'Drive',
			key: 'd',
			url: 'https://drive.google.com',
			search: '/drive/search?q={}',
			color: 'linear-gradient(135deg, #FFD04B, #1EA362, #4688F3)',
			quickLaunch: false
		},
		{
			name: 'LinkedIn',
			key: 'l',
			url: 'https://linkedin.com',
			search: '/search/results/all/?keywords={}',
			color: 'linear-gradient(135deg, #006CA4, #0077B5)',
			quickLaunch: true
		},
		{
			name: 'GitHub',
			key: 'g',
			url: 'https://github.com',
			search: '/search?q={}',
			color: 'linear-gradient(135deg, #24292e, #3b3b3b)',
			quickLaunch: true
		},
		{
			name: 'StackOverflow',
			key: 's',
			url: 'https://stackoverflow.com',
			search: '/search?q={}',
			color: 'linear-gradient(135deg, #53341C, #F48024)',
			quickLaunch: true
		},
		{
			name: 'Ars Technica',
			key: 'a',
			url: 'https://arstechnica.com',
			search: '/search/?ie=UTF-8&q={}',
			color: 'linear-gradient(135deg, #FF4E00, #B83800)',
			quickLaunch: false
		},
		{
			name: 'YouTube',
			key: 'y',
			url: 'https://youtube.com',
			search: '/results?search_query={}',
			color: 'linear-gradient(135deg, #cd201f, #cd4c1f)',
			quickLaunch: false
		},
		{
			name: 'Netflix',
			key: 'n',
			url: 'https://www.netflix.com',
			color: 'linear-gradient(135deg, #E50914, #CB020C)',
			quickLaunch: false
		},
		{
			name: 'Twitch',
			key: 't',
			url: 'https://www.twitch.tv',
			search: '/directory/game/{}',
			color: 'linear-gradient(135deg, #6441a5, #4b367c)',
			quickLaunch: false
		},
		{
			name: 'Reddit',
			key: 'r',
			url: 'https://reddit.com',
			search: '/search?q={}',
			color: 'linear-gradient(135deg, #dc752f, #ff4500)',
			quickLaunch: false
		},
		{
			name: 'Twitter',
			key: 'o',
			url: 'https://twitter.com',
			color: 'linear-gradient(135deg, #C0A886, #E2DBC8)',
			quickLaunch: true
		},
		{
			name: 'IMDb',
			key: 'i',
			url: 'https://imdb.com',
			search: '/find?ref_=nv_sr_fn&q={}',
			color: 'linear-gradient(135deg, #7A5F00, #E8B708)',
			quickLaunch: false
		}
	],

	/**
	 * Get suggestions as you type.
	 */
	suggestions: true,
	suggestionsLimit: 6,

	/**
	 * The order and limit for each suggestion influencer. An "influencer" is
	 * just a suggestion source. The following influencers are available:
	 *
	 * - "Default" suggestions come from CONFIG.defaultSuggestions
	 * - "DuckDuckGo" suggestions come from the duck duck go search api
	 * - "History" suggestions come from your previously entered queries
	 */
	influencers: [
		{ name: 'Default', limit: 4 },
		{ name: 'History', limit: 1 },
		{ name: 'DuckDuckGo', limit: 4 }
	],

	/**
	 * Default search suggestions for the specified queries.
	 */
	defaultSuggestions: {
		g: ['g/issues', 'g/pulls', 'gist.github.com'],
		r: [
			'r/r/unixporn',
			'r/r/startpages',
			'r/r/webdev',
			'r/r/technology',
			'/r/r/rust'
		]
	},

	/**
	 * Instantly redirect when a key is matched. Put a space before any other
	 * queries to prevent unwanted redirects.
	 */
	instantRedirect: false,

	/**
	 * Open triggered queries in a new tab.
	 */
	newTab: false,

	/**
	 * Dynamic overlay background colors when command domains are matched.
	 */
	colors: true,

	/**
	 * Reverse color theme
	 */
	reversedColors: false,

	/**
	 * The delimiter between a command key and your search query. For example,
	 * to search GitHub for potatoes, you'd type "g:potatoes".
	 */
	searchDelimiter: ':',

	/**
	 * The delimiter between a command key and a path. For example, you'd type
	 * "r/r/unixporn" to go to "https://reddit.com/r/unixporn".
	 */
	pathDelimiter: '/'
};

const $ = {
	bodyClassAdd: c => $.el('body').classList.add(c),
	bodyClassRemove: c => $.el('body').classList.remove(c),
	el: s => document.querySelector(s),
	els: s => [].slice.call(document.querySelectorAll(s) || []),
	escapeRegex: s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'),
	flattenAndUnique: arr => [...new Set([].concat.apply([], arr))],
	ieq: (a, b) => a.toLowerCase() === b.toLowerCase(),
	iin: (a, b) => a.toLowerCase().indexOf(b.toLowerCase()) !== -1,
	isDown: e => ['c-n', 'down', 'tab'].includes($.key(e)),
	isRemove: e => ['backspace', 'delete'].includes($.key(e)),
	isUp: e => ['c-p', 'up', 's-tab'].includes($.key(e)),

	jsonp: url => {
		let script = document.createElement('script');
		script.src = url;
		$.el('head').appendChild(script);
	},

	key: e => {
		const ctrl = e.ctrlKey;
		const shift = e.shiftKey;

		switch (e.which) {
			case 8:
				return 'backspace';
			case 9:
				return shift ? 's-tab' : 'tab';
			case 13:
				return 'enter';
			case 16:
				return 'shift';
			case 17:
				return 'ctrl';
			case 18:
				return 'alt';
			case 27:
				return 'escape';
			case 38:
				return 'up';
			case 40:
				return 'down';
			case 46:
				return 'delete';
			case 78:
				return ctrl ? 'c-n' : 'n';
			case 80:
				return ctrl ? 'c-p' : 'p';
			case 189:
				return 'dash';
			case 91:
			case 93:
			case 224:
				return 'super';
		}
	},

	pad: v => ('0' + v.toString()).slice(-2)
};

class Influencer {
	constructor(options) {
		this._limit = options.limit;
		this._parseQuery = options.parseQuery;
	}

	addItem() {}
	getSuggestions() {}

	_addSearchPrefix(items, query) {
		const searchPrefix = this._getSearchPrefix(query);
		return items.map(s => (searchPrefix ? searchPrefix + s : s));
	}

	_getSearchPrefix(query) {
		const { isSearch, key, split } = this._parseQuery(query);
		return isSearch ? `${key}${split} ` : false;
	}
}

class DefaultInfluencer extends Influencer {
	constructor({ defaultSuggestions }) {
		super(...arguments);
		this._defaultSuggestions = defaultSuggestions;
	}

	getSuggestions(query) {
		return new Promise(resolve => {
			const suggestions = this._defaultSuggestions[query];
			resolve(suggestions ? suggestions.slice(0, this._limit) : []);
		});
	}
}

class DuckDuckGoInfluencer extends Influencer {
	constructor({ queryParser }) {
		super(...arguments);
	}

	getSuggestions(rawQuery) {
		const { query } = this._parseQuery(rawQuery);
		if (!query) {
			return Promise.resolve([]);
		}

		return new Promise(resolve => {
			const endpoint = 'https://duckduckgo.com/ac/';
			const callback = 'autocompleteCallback';

			window[callback] = res => {
				const suggestions = res
					.map(i => i.phrase)
					.filter(s => !$.ieq(s, query))
					.slice(0, this._limit);

				resolve(this._addSearchPrefix(suggestions, rawQuery));
			};

			$.jsonp(`${endpoint}?callback=${callback}&q=${query}`);
		});
	}
}

class HistoryInfluencer extends Influencer {
	constructor() {
		super(...arguments);
		this._storeName = 'history';
	}

	addItem(query) {
		if (query.length < 2) {
			return;
		}
		let exists;

		const history = this._getHistory().map(([item, count]) => {
			const match = $.ieq(item, query);
			if (match) {
				exists = true;
			}
			return [item, match ? count + 1 : count];
		});

		if (!exists) {
			history.push([query, 1]);
		}

		const sorted = history
			.sort((current, next) => current[1] - next[1])
			.reverse();

		this._setHistory(sorted);
	}

	getSuggestions(query) {
		return new Promise(resolve => {
			const suggestions = this._getHistory()
				.map(([item]) => item)
				.filter(item => query && !$.ieq(item, query) && $.iin(item, query))
				.slice(0, this._limit);

			resolve(suggestions);
		});
	}

	_fetch() {
		return JSON.parse(localStorage.getItem(this._storeName)) || [];
	}

	_getHistory() {
		this._history = this._history || this._fetch();
		return this._history;
	}

	_save(history) {
		localStorage.setItem(this._storeName, JSON.stringify(history));
	}

	_setHistory(history) {
		this._history = history;
		this._save(history);
	}
}

class Suggester {
	constructor(options) {
		this._el = $.el('#search-suggestions');
		this._enabled = options.enabled;
		this._influencers = options.influencers;
		this._limit = options.limit;
		this._suggestionEls = [];
		this._handleKeydown = this._handleKeydown.bind(this);
		this._registerEvents();
	}

	setOnClick(callback) {
		this._onClick = callback;
	}

	setOnHighlight(callback) {
		this._onHighlight = callback;
	}

	setOnUnhighlight(callback) {
		this._onUnhighlight = callback;
	}

	success(query) {
		this._clearSuggestions();
		this._influencers.forEach(i => i.addItem(query));
	}

	suggest(input) {
		if (!this._enabled) {
			return;
		}
		input = input.trim();
		if (input === '') {
			this._clearSuggestions();
		}

		Promise.all(this._getInfluencerPromises(input)).then(res => {
			const suggestions = $.flattenAndUnique(res);
			this._clearSuggestions();

			if (suggestions.length) {
				this._appendSuggestions(suggestions, input);
				this._registerSuggestionHighlightEvents();
				this._registerSuggestionClickEvents();
				$.bodyClassAdd('suggestions');
			}
		});
	}

	_appendSuggestions(suggestions, input) {
		suggestions.some((suggestion, i) => {
			const match = new RegExp($.escapeRegex(input), 'ig');
			const suggestionHtml = suggestion.replace(match, `<b>${input}</b>`);

			this._el.insertAdjacentHTML(
				'beforeend',
				`<li>
          <button
            type="button"
            class="js-search-suggestion search-suggestion"
            data-suggestion="${suggestion}"
            tabindex="-1"
          >
            ${suggestionHtml}
          </button>
        </li>`
			);

			if (i + 1 >= this._limit) {
				return true;
			}
		});

		this._suggestionEls = $.els('.js-search-suggestion');
	}

	_clearSuggestionClickEvents() {
		this._suggestionEls.forEach(el => {
			el.removeEventListener('click', this._onClick);
		});
	}

	_clearSuggestionHighlightEvents() {
		this._suggestionEls.forEach(el => {
			el.removeEventListener('mouseover', this._highlight);
			el.removeEventListener('mouseout', this._unHighlight);
		});
	}

	_clearSuggestions() {
		$.bodyClassRemove('suggestions');
		this._clearSuggestionHighlightEvents();
		this._clearSuggestionClickEvents();
		this._suggestionEls = [];
		this._el.innerHTML = '';
	}

	_focusNext(e) {
		const exists = this._suggestionEls.some((el, i) => {
			if (el.classList.contains('highlight')) {
				this._highlight(this._suggestionEls[i + 1], e);
				return true;
			}
		});

		if (!exists) {
			this._highlight(this._suggestionEls[0], e);
		}
	}

	_focusPrevious(e) {
		const exists = this._suggestionEls.some((el, i) => {
			if (el.classList.contains('highlight') && i) {
				this._highlight(this._suggestionEls[i - 1], e);
				return true;
			}
		});

		if (!exists) {
			this._unHighlight(e);
		}
	}

	_getInfluencerPromises(input) {
		return this._influencers.map(influencer =>
			influencer.getSuggestions(input)
		);
	}

	_handleKeydown(e) {
		if ($.isDown(e)) {
			this._focusNext(e);
		}
		if ($.isUp(e)) {
			this._focusPrevious(e);
		}
	}

	_highlight(el, e) {
		this._unHighlight();
		if (!el) {
			return;
		}
		this._onHighlight(el.getAttribute('data-suggestion'));
		el.classList.add('highlight');
		e.preventDefault();
	}

	_registerEvents() {
		document.addEventListener('keydown', this._handleKeydown);
	}

	_registerSuggestionClickEvents() {
		this._suggestionEls.forEach(el => {
			const value = el.getAttribute('data-suggestion');
			el.addEventListener('click', this._onClick.bind(null, value));
		});
	}

	_registerSuggestionHighlightEvents() {
		const noHighlightUntilMouseMove = () => {
			window.removeEventListener('mousemove', noHighlightUntilMouseMove);

			this._suggestionEls.forEach(el => {
				el.addEventListener('mouseover', this._highlight.bind(this, el));
				el.addEventListener('mouseout', this._unHighlight.bind(this));
			});
		};

		window.addEventListener('mousemove', noHighlightUntilMouseMove);
	}

	_unHighlight(e) {
		const el = $.el('.highlight');
		if (!el) {
			return;
		}
		this._onUnhighlight();
		el.classList.remove('highlight');
		if (e) {
			e.preventDefault();
		}
	}
}

class QueryParser {
	constructor(options) {
		this._commands = options.commands;
		this._searchDelimiter = options.searchDelimiter;
		this._pathDelimiter = options.pathDelimiter;
		this._protocolRegex = /^[a-zA-Z]+:\/\//i;
		this._urlRegex = /^((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)$/i;
		this.parse = this.parse.bind(this);
	}

	parse(query) {
		const res = { query: query, split: null };

		if (this._urlRegex.test(query)) {
			const hasProtocol = this._protocolRegex.test(query);
			res.redirect = hasProtocol ? query : 'http://' + query;
		} else {
			const trimmed = query.trim();
			const splitSearch = trimmed.split(this._searchDelimiter);
			const splitPath = trimmed.split(this._pathDelimiter);

			this._commands.some(({ category, key, name, search, url }) => {
				if (query === key) {
					res.key = key;
					res.isKey = true;
					res.redirect = url;
					return true;
				}

				if (splitSearch[0] === key && search) {
					res.key = key;
					res.isSearch = true;
					res.split = this._searchDelimiter;
					res.query = QueryParser._shiftAndTrim(splitSearch, res.split);
					res.redirect = QueryParser._prepSearch(url, search, res.query);
					return true;
				}

				if (splitPath[0] === key) {
					res.key = key;
					res.isPath = true;
					res.split = this._pathDelimiter;
					res.path = QueryParser._shiftAndTrim(splitPath, res.split);
					res.redirect = QueryParser._prepPath(url, res.path);
					return true;
				}

				if (key === '*') {
					res.redirect = QueryParser._prepSearch(url, search, query);
				}
			});
		}

		res.color = QueryParser._getColorFromUrl(this._commands, res.redirect);
		return res;
	}

	static _getColorFromUrl(commands, url) {
		const domain = new URL(url).hostname;

		return (
			commands
				.filter(c => new URL(c.url).hostname.includes(domain))
				.map(c => c.color)[0] || null
		);
	}

	static _prepPath(url, path) {
		return QueryParser._stripUrlPath(url) + '/' + path;
	}

	static _prepSearch(url, searchPath, query) {
		if (!searchPath) {
			return url;
		}
		const baseUrl = QueryParser._stripUrlPath(url);
		const urlQuery = encodeURIComponent(query);
		searchPath = searchPath.replace('{}', urlQuery);
		return baseUrl + searchPath;
	}

	static _shiftAndTrim(arr, delimiter) {
		arr.shift();
		return arr.join(delimiter).trim();
	}

	static _stripUrlPath(url) {
		const parser = document.createElement('a');
		parser.href = url;
		return `${parser.protocol}//${parser.hostname}`;
	}
}

class Form {
	constructor(options) {
		this._colors = options.colors;
		this._formEl = $.el('#search-form');
		this._inputEl = $.el('#search-input');
		this._inputElVal = '';
		this._instantRedirect = options.instantRedirect;
		this._newTab = options.newTab;
		this._parseQuery = options.parseQuery;
		this._suggester = options.suggester;
		this._toggleHelp = options.toggleHelp;
		this._quickLaunch = options.quickLaunch;
		this._clearPreview = this._clearPreview.bind(this);
		this._handleInput = this._handleInput.bind(this);
		this._handleKeydown = this._handleKeydown.bind(this);
		this._previewValue = this._previewValue.bind(this);
		this._submitForm = this._submitForm.bind(this);
		this._submitWithValue = this._submitWithValue.bind(this);
		this._reverseColors = options.reversedColors;
		this.hide = this.hide.bind(this);
		this.show = this.show.bind(this);
		this._registerEvents();
		this._loadQueryParam();
		this.reverse();
	}

	hide() {
		$.bodyClassRemove('form');
		this._inputEl.value = '';
		this._inputElVal = '';
		this._suggester.suggest('');
		this._setBackgroundFromQuery('');
	}

	show() {
		$.bodyClassAdd('form');
		this._inputEl.focus();
	}

	reverse() {
		if (this._reverseColors) {
			document.documentElement.style.setProperty('--background', '#F1F1F1');
			document.documentElement.style.setProperty('--foreground', '#0e0e0e');
		}
	}

	_clearPreview() {
		this._previewValue(this._inputElVal);
		this._inputEl.focus();
	}

	_handleInput() {
		const newQuery = this._inputEl.value;
		const isHelp = newQuery === '?';
		const isLaunch = newQuery === '!';
		const { isKey } = this._parseQuery(newQuery);
		this._inputElVal = newQuery;
		this._suggester.suggest(newQuery);
		this._setBackgroundFromQuery(newQuery);
		if (!newQuery || isHelp) {
			this.hide();
		}
		if (isHelp) {
			this._toggleHelp();
		}
		if (isLaunch) {
			this._quickLaunch();
		}
		if (this._instantRedirect && isKey) {
			this._submitWithValue(newQuery);
		}
	}

	_handleKeydown(e) {
		if ($.isUp(e) || $.isDown(e) || $.isRemove(e)) {
			return;
		}

		switch ($.key(e)) {
			case 'alt':
			case 'ctrl':
			case 'enter':
			case 'shift':
			case 'super':
				return;
			case 'escape':
				this.hide();
				return;
		}

		this.show();
	}

	_loadQueryParam() {
		const q = new URLSearchParams(window.location.search).get('q');
		if (q) {
			this._submitWithValue(q);
		}
	}

	_previewValue(value) {
		this._inputEl.value = value;
		this._setBackgroundFromQuery(value);
	}

	_redirect(redirect) {
		if (this._newTab) {
			window.open(redirect, '_blank');
		} else {
			window.location.href = redirect;
		}
	}

	_registerEvents() {
		document.addEventListener('keydown', this._handleKeydown);
		this._inputEl.addEventListener('input', this._handleInput);
		this._formEl.addEventListener('submit', this._submitForm, false);

		if (this._suggester) {
			this._suggester.setOnClick(this._submitWithValue);
			this._suggester.setOnHighlight(this._previewValue);
			this._suggester.setOnUnhighlight(this._clearPreview);
		}
	}

	_setBackgroundFromQuery(query) {
		if (!this._colors) {
			return;
		}
		this._formEl.style.background = this._parseQuery(query).color;
	}

	_submitForm(e) {
		if (e) {
			e.preventDefault();
		}
		const query = this._inputEl.value;
		if (this._suggester) {
			this._suggester.success(query);
		}
		this.hide();
		this._redirect(this._parseQuery(query).redirect);
	}

	_submitWithValue(value) {
		this._inputEl.value = value;
		this._submitForm();
	}
}

const queryParser = new QueryParser({
	commands: CONFIG.commands,
	pathDelimiter: CONFIG.pathDelimiter,
	searchDelimiter: CONFIG.searchDelimiter
});

const influencers = CONFIG.influencers.map(influencerConfig => {
	return new {
		Default: DefaultInfluencer,
		DuckDuckGo: DuckDuckGoInfluencer,
		History: HistoryInfluencer
	}[influencerConfig.name]({
		defaultSuggestions: CONFIG.defaultSuggestions,
		limit: influencerConfig.limit,
		parseQuery: queryParser.parse
	});
});

const suggester = new Suggester({
	enabled: CONFIG.suggestions,
	influencers,
	limit: CONFIG.suggestionsLimit
});

const form = new Form({
	colors: CONFIG.colors,
	instantRedirect: CONFIG.instantRedirect,
	newTab: CONFIG.newTab,
	parseQuery: queryParser.parse,
	suggester,
	reversedColors: CONFIG.reversedColors
});
