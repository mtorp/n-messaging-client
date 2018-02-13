module.exports = (banner, done) => {

	const MIN_WIDTH_TO_ACTIVATE = 980;

	const viewportWidth = window.innerWidth;
	if (viewportWidth < MIN_WIDTH_TO_ACTIVATE) return;
	// only run if on specific apps
	const el = document.querySelector('.js-success');
	const app = el && el.dataset && el.dataset.nextApp;
	app === 'article' && document.querySelector('.content__video')
	if (app === 'article' && document.querySelector('.content__video')) return;

	const overlay = document.createElement('div');
	overlay.className = 'o-overlay-shadow';
	document.body.appendChild(overlay);

	done();
};
