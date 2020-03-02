import signup from './signup';

export default function (banner, done) {
	function loadSuccessContent () {
		// hide front banner
		banner.bannerElement.querySelector('[data-n-messaging-daily-digest-front]').classList.add('n-messaging-daily-digest--hidden');
		// move the close button to the back banner
		banner.closeButtonElement.parentNode.removeChild(banner.closeButtonElement);
		banner.bannerElement.querySelector('[data-daily-digest-actions]').appendChild(banner.closeButtonElement);
		// make the banner green (success)
		banner.bannerElement.classList.add('o-banner--success');
		// show the back banner
		banner.bannerElement.querySelector('[data-n-messaging-daily-digest-back]').classList.remove('n-messaging-daily-digest--hidden');
	}

	function logError (err) {
		/* eslint no-console:0 */
		console.log({ info: 'could not add user to the daily digest', err });
	}

	function handleSignUpClick (evt) {
		evt.preventDefault();
		signup()
			.then(loadSuccessContent)
			.catch(logError);
		return false;
	}

	const signUpButton = banner.bannerElement.querySelector('[data-daily-digest-sign-up]');
	signUpButton.addEventListener('click', handleSignUpClick);

	done();
}
