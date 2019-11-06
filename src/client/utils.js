const cookies = require('js-cookie');
const set = require('lodash.set');
const get = require('lodash.get');

const manifest = require('../../manifest');
const stateCookieName = 'nMessagingEventCounter';

const dispatchEvent = (event) => {
	document.body.dispatchEvent(event);
};

const updateLocalCounter = (messageId, event) => {
	const currentCounts = cookies.get(stateCookieName) ? JSON.parse(cookies.get(stateCookieName)) : {};
	const currentCount = get(currentCounts, `${messageId}.${event}`) || 0;
	set(currentCounts, `${messageId}.${event}`, currentCount + 1);
	cookies.set(stateCookieName, currentCounts, { domain: 'ft.com' });
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
			updateLocalCounter(messageId,action);
		};
	},
	listen: function (el, ev, cb) {
		if (el) el.addEventListener(ev, cb);
	},
	messageEventLimitsBreached: function (messageId) {
		const messageRules = get(manifest, `${messageId}.eventRules`);
		if (!messageRules){
			return false;
		}
		const currentCounts = cookies.get(stateCookieName) ? JSON.parse(cookies.get(stateCookieName)) : {};

		return Object.keys(messageRules.maxOccurrences).some( function (eventType) {
			const eventCount = get(currentCounts, `${messageId}.${eventType}`) || 0;
			return (eventCount >= messageRules.maxOccurrences[eventType]);
		});
	}
};
