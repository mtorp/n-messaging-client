import myft from 'next-myft-client';
import Cookies from 'js-cookie';

module.exports = function customSetup (banner, done) {
	if (window.FT && window.FT.flags && window.FT.flags.oneClickDailyDigest) {
		function loadSuccessContent () {
			const outerContainer = banner.bannerElement.querySelector('.o-banner__outer');
			outerContainer.classList.add('o-banner_success-background');
			const closeButton = banner.bannerElement.querySelector('.o-banner__close');
			closeButton.classList.add('o-banner__close-color');
			const signupContent = banner.bannerElement.querySelector('.o-banner_signup-content');
			signupContent.classList.add('--is-visible');
			const successContent = banner.bannerElement.querySelector('.o-banner_success-content');
			successContent.classList.remove('--is-visible');
		}

		function handleSignUpClick (evt) {
			evt.preventDefault();

			function getCSRFToken () {
				const desiredTokenLength = 36;
				const token = Cookies.get('FTSession_s') || Cookies.get('FTSession');
				const csrfToken = token ? token.slice(-desiredTokenLength) : '';
				return csrfToken;
			}

			function addUserToDigest () {
				try {
					return myft.add('user', null, 'preferred', 'preference', 'email-digest', {
						token: getCSRFToken,
						_rel:{
							type: 'daily',
							sendTime:'every morning'
						}
					});
				} catch(e) {
					return e;
				}
			}

			function logError (err) {
				/* eslint no-console:0 */
				console.log({ info: 'could not add user to the daily digest', err });
			}

			myft.init().then(addUserToDigest).then(loadSuccessContent).catch(logError);
			return false;
		}

		const link = banner.innerElement.querySelector('[data-n-messaging-action]');
		link.addEventListener('click', handleSignUpClick);
	}

	done();

};
