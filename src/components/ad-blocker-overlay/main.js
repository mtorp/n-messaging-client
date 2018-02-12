const Overlay = require('o-overlay');

module.exports = (banner, done) => {

	const bannerInnerElement = banner.innerElement;

	const overlayOptions = {
		html: bannerInnerElement,
		modal: true,
		preventclosing: true,
		customclose: false
	};


	const adBlockingOverlay = new Overlay('counter-ad-block', overlayOptions);

	adBlockingOverlay.open();

	//Prevent scrolling of page behind overlay
	document.body.classList.add('counter-adblock__prevent-scroll');
	document.documentElement.classList.add('counter-adblock__prevent-scroll');

	const removeScrollBlock = () => {
		document.removeEventListener('oOverlay.destroy', removeScrollBlock);
		document.body.classList.remove('counter-adblock__prevent-scroll');
		document.documentElement.classList.remove('counter-adblock__prevent-scroll');
	};

	document.addEventListener('oOverlay.destroy', removeScrollBlock);

	done();
};
