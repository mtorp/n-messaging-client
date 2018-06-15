const fetchAsyncConfig = require('./next-messaging-guru-client');
const topSlot = require('./top-slot');
const bottomSlot = require('./bottom-slot');
const components = require('../components');
const manifest = require('../../manifest');
const _get = require('lodash/get');

const LAZY_REGEXP = /\/lazy$/;

module.exports = {
	init: function () {
		const slots = document.querySelectorAll('[data-n-messaging-slot]');
		const messages = slots && Array.prototype.slice.call(slots).map(elm => {
			const dataSet = elm.dataset || {};
			const variant = manifest[dataSet.nMessagingName];
			return {
				variant,
				position: dataSet.nMessagingSlot,
				name: dataSet.nMessagingName,
				content: elm.querySelector('[data-n-messaging-component]'),
				path: variant.path,
				lazy: LAZY_REGEXP.test(variant.path),
				guruQueryString: variant.guruQueryString
			};
		});
		if (messages.length > 0) {
			Promise.all(messages.map(msg => this.initialiseMessage(msg)))
				.catch(this.handleError);
		}
	},
	initialiseMessage (config) {
		const render = this.renderHandler(config.position);
		const customSetup = this.setupHandler(config.path);
		const formatData = (res) => ({ config, guruResult: res, customSetup });
		const getData = config.lazy
			? fetchAsyncConfig(config)
			: Promise.resolve(null);
		return getData.then(formatData).then(render);
	},
	renderHandler (position) {
		if (position === 'top') return topSlot;
		if (position === 'bottom') return bottomSlot;
	},
	setupHandler (path) {
		try {
			if (path) return require(`../components/${path}/main`);
		} catch (err) {
			return;
		}
	},
	handleError (error) {
		throw error;
		// console.error(error);
	}
};
