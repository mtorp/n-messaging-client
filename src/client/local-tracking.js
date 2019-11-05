const cookies = require('js-cookie');
const _=require('lodash');

const stateCookieName = 'nMessagingEventCounter';
const manifest = require('../../manifest');

const getMessageEventRules = function(messageId){
	const rules = _.get(manifest, `${messageId}.eventRules`);
	return rules;
}


module.exports = {
	updateLocalCounter: function (messageId, event) {
		const currentCounts = cookies.get(stateCookieName) ? JSON.parse(cookies.get(stateCookieName)) : {};
		const currentCount = _.get(currentCounts, `${messageId}.${event}`) || 0;
		_.set(currentCounts, `${messageId}.${event}`, currentCount + 1);
		cookies.set(stateCookieName, currentCounts, { domain: 'ft.com' });
	},
	messageEventLimitsBreached: function (messageId) {
		const messageRules = getMessageEventRules(messageId);
		if (!messageRules){
			alert('no rules found for that message');
			return false
		}
		const currentCounts = cookies.get(stateCookieName) ? JSON.parse(cookies.get(stateCookieName)) : {};

		return Object.keys(messageRules.maxOccurrences).some( function (eventType) {
			const eventCount = _.get(currentCounts, `${messageId}.${eventType}`) || 0;
			return (eventCount >= messageRules.maxOccurrences[eventType]);
		});
	}
};
