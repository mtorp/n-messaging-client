const BANNER_CLASS = 'n-messaging-banner';

module.exports = function (options={}) {
	// TODO: fix import problem and move to top of scope?
	const oBanner = require('o-banner');

	let banner;
	const event = messageEvent(options.id);

	const declarativeElement = !options.lazy && options.content;

	if (declarativeElement) {
		banner = new oBanner(declarativeElement, { bannerClass: BANNER_CLASS, autoOpen: false });
	} else {
		banner = new oBanner(null, imperativeOptions(options));
	}

	// event handlers
	const mainAction = banner.innerElement.querySelector('a.n-messaging-banner__button');
	const secondaryAction = banner.innerElement.querySelector('a.n-messaging-banner__link');

	listen(banner.bannerElement, 'o.bannerClosed', 'close');
	listen(banner.bannerElement, 'o.bannerOpened', 'view');
	listen(mainAction, 'click', 'act');
	listen(secondaryAction, 'click', 'act');

	// show banner
	banner.open();

	function imperativeOptions (opts) {
		return {
			autoOpen: opts.autoOpen || false,
			bannerClass: opts.bannerClass || BANNER_CLASS,
			theme: opts.theme,
			contentLong: opts.contentLong,
			contentShort: opts.contentShort,
			buttonLabel: opts.buttonLabel,
			buttonUrl: opts.buttonUrl,
			linkLabel: opts.linkLabel,
			linkUrl: opts.linkUrl
		};
	}

	function messageEvent (messageId) {
		return function (action) {
			document.body.dispatchEvent(new CustomEvent('oTracking.event', {
				detail: {
					category: 'component',
					action: action,
					messaging: messageId
				},
				bubbles: true
			}));
		}
	}

	function listen (el, ev, action) {
		if (el) {
			el.addEventListener(ev, function () {
				event(action);
			});
		}
	}

};
