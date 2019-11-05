const {updateLocalCounter, messageEventLimitsBreached} = require('../../../client/local-tracking');

const messageId = 'ftWeekendPromo';


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

	if (messageEventLimitsBreached(messageId) ){
		removeBanner();
		done({ skip: true });
	} else {
		updateLocalCounter(messageId,'view'); // todo.  is this the right way to regsiter viewing of this component?
		done();
	}

};
