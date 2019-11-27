const cookies = require('js-cookie');
const set = require('lodash.set');
const get = require('lodash.get');

const manifest = require('../../manifest');
const LOCAL_COUNTER_COOKIE_NAME = 'nMessagingEventCounter';
const COOKIE_LIFE_MINUTES = 5;

const dispatchEvent = (event) => {
	document.body.dispatchEvent(event);
};

const getMessageRules = (messageId) => {
	return get(manifest, `${messageId}.eventRules`);
};

const updateLocalCounter = (messageId, event) => {
	const currentCounts = cookies.get(LOCAL_COUNTER_COOKIE_NAME) ? JSON.parse(cookies.get(LOCAL_COUNTER_COOKIE_NAME)) : {};
	const currentCount = get(currentCounts, `${messageId}.${event}`) || 0;
	set(currentCounts, `${messageId}.${event}`, currentCount + 1);

	// don't make the cookie too sticky, or we can't re-show the message intentionally at a later date.
	// But it needs to stick around long enough to do the job of allowing spoor/envoy pipeline to catch up:
	const expiryDate = new Date(new Date().getTime() + COOKIE_LIFE_MINUTES * 60 * 1000);

	cookies.set(LOCAL_COUNTER_COOKIE_NAME, currentCounts, { domain: 'ft.com', expires: expiryDate });
};

module.exports = {
	generateMessageEvent: function ({ messageId, position, flag, variant }={}) {
		return function (action, trackingAttr) {
			const detail = {
				category: 'n-messaging',
				action: action,
				messaging: messageId,
				messaging_position: position,
				messaging_flag: flag,
				messaging_variant: variant
			};
			if (trackingAttr)
				detail.messaging_action = trackingAttr;
			const messagingEvent = new CustomEvent('oTracking.event', { detail, bubbles: true });
			dispatchEvent(messagingEvent);
			/* TODO: remove below fallback event once we port to the above */
			const oldEvent = new CustomEvent('oTracking.event', { detail: Object.assign({}, detail, { category: 'component' }), bubbles: true });
			dispatchEvent(oldEvent);
			if (getMessageRules(messageId)){
				updateLocalCounter(messageId,action);
			}
		};
	},
	listen: function (el, ev, cb) {
		if (el) el.addEventListener(ev, cb);
	},
	messageEventLimitsBreached: function (messageId) {
		const messageRules = getMessageRules(messageId);
		if (!messageRules){
			return false;
		}
		const currentCounts = cookies.get(LOCAL_COUNTER_COOKIE_NAME) ? JSON.parse(cookies.get(LOCAL_COUNTER_COOKIE_NAME)) : {};

		return Object.keys(messageRules.maxOccurrences).some( function (eventType) {
			const eventCount = get(currentCounts, `${messageId}.${eventType}`) || 0;
			return (eventCount >= messageRules.maxOccurrences[eventType]);
		});
	}
};
