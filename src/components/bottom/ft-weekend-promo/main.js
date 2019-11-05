const cookies = require('js-cookie');
const _=require('lodash');

const messageId = 'ftWeekendPromo';
const messageRules = {messageId, maxOccurrences: {click: 1, view: 3}}; //hide the banner after this number of events
const stateCookieName = 'nMessagingEventCounter';

function updateLocalCounter (messageId, event) {
	const currentCounts = cookies.get(stateCookieName) ? JSON.parse(cookies.get(stateCookieName)) : {};
	const currentCount = _.get(currentCounts, `${messageId}.${event}`) || 0;
	_.set(currentCounts, `${messageId}.${event}`, currentCount + 1);
	cookies.set(stateCookieName, currentCounts, { domain: 'ft.com' });
}

function messageEventLimitsBreached (messageRules) {
	const currentCounts = cookies.get(stateCookieName) ? JSON.parse(cookies.get(stateCookieName)) : {};
	const messageId = messageRules.messageId;

	return Object.keys(messageRules.maxOccurrences).some( function (eventType) {
		const eventCount = _.get(currentCounts, `${messageId}.${eventType}`) || 0;
		return (eventCount >= messageRules.maxOccurrences[eventType]);
	});
}


module.exports = function customSetup (banner, done) {
	const bannerElem = banner.bannerElement;
	const submitBtn = banner.innerElement.querySelector('.n-messaging-banner__button');
	const articleLinks = Array.from(banner.innerElement.querySelectorAll('.n-messaging-banner__link'));

	function handleClick () {
		// the user has clicked on one of the message's CTAs. Therefore we need to update th ecookie accordingly.
		// Because we can't rely on spoor events to be fired/processed quickly enough to prevent the user seeing the message again.
		updateLocalCounter(messageId,'click');
	};

	const removeBanner = () => {
		bannerElem.parentNode.removeChild(bannerElem);
		document.body.focus();
	};

	submitBtn.addEventListener('click', handleClick);
	articleLinks.map( function (link) {
		link.addEventListener('click', handleClick);
	} );

	if (messageEventLimitsBreached(messageRules) ){
		removeBanner();
		done({ skip: true });
	} else {
		updateLocalCounter(messageId,'view'); // todo.  is this the right way to regsiter viewing of this component?
		done();
	}

};
