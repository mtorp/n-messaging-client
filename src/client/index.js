const fetchAsyncConfig = require('./next-messaging-guru-client');
const topSlot = require('./top-slot');
const bottomSlot = require('./bottom-slot');
const components = require('../components');
const manifest = require('../../manifest');
const _get = require('lodash/get');

const LAZY_REGEXP = /\/lazy$/;

const dataTypeContract = (type) => [TOP_TYPE, BOTTOM_TYPE].includes(type);

module.exports = {
	init: function () {
		const slots = document.querySelectorAll('[data-n-messaging-slot]');
		const messages = slots && Array.prototype.slice.call(slots).map(elm => {
			const dataSet = elm.dataset || {};
			return {
				position: dataSet.nMessagingSlot,
				name: dataSet.nMessagingName,
				content: elm.querySelector('[data-n-messaging-component]')
			};
		});
		if (messages.length > 0) {
			Promise.all(messages.map(msg => this.initialiseMessage(msg)))
				.catch(this.handleError);
		}
	},
	initialiseMessage (config) {
		const variant = manifest[config.name];
		const path = variant.path;
		config.lazy = LAZY_REGEXP.test(variant.partial);

		if (_get(variant, 'guruQueryString')) {
			config.guruQueryString = _get(variant, 'guruQueryString');
		}

		const render = this.renderHandler(config.position);
		const customSetup = this.setupHandler(path);
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
		if (path) return require(`../components/${path}/main`);
	},
	handleError (error) {
		throw error;
		// console.error(error);
	}
};
