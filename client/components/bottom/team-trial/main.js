const Overlay = require('o-overlay').default;
const componentName = 'n-overlay';
const loaderClass = 'o-overlay--n-overlay-loader';
const iframeClass = 'o-overlay--n-overlay-iframe';
const generateHtml = (src) => `
<article class="${loaderClass}">
	<div class="${loaderClass}-indicator o-loading o-loading--dark o-loading--large"></div>
</article>
<iframe class="${iframeClass}" src="${src}"></iframe>`;

module.exports = function customSetup (banner, done) {

	const overlayTrigger = banner.bannerElement.querySelector('.o-banner__button');

	if (overlayTrigger) {
		const src = overlayTrigger.href + (/\?/.test(overlayTrigger.href) ? '&' : '?') + 'embedded=true';
		const options = {
			html: generateHtml(src),
			trigger: overlayTrigger,
			heading: {
				title: overlayTrigger.text,
				visuallyHideTitle: true
			}
		};

		// Remove default link functionality for overlay to open
		overlayTrigger.addEventListener('click', e => e.preventDefault());

		new Overlay(componentName, options);
	}

	done();
};
