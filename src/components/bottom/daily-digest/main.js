import myft from 'next-myft-client';

module.exports = function customSetup (banner, done) {
	if (window.FT && window.FT.flags && window.FT.flags.oneClickDailyDigest) {
		function generateSuccessHtmlContent () {
			const outerContainer = banner.bannerElement.querySelector('.o-banner__outer');
			outerContainer.classList.add('o-banner_success-background');
			const signupContent = banner.bannerElement.querySelector('.signup-content');
			signupContent.classList.add('--is-visible');
			const successContent = banner.bannerElement.querySelector('.success-content');
			successContent.classList.remove('--is-visible');
		}

		function handleSignUpClick (evt) {
			evt.preventDefault();
			const conceptId = document.documentElement.dataset.conceptId;
			if (conceptId) {
				function addUserToConcept () {
					return myft.add('user', null, 'followed', 'concept', conceptId);
				}
				function logError (err) {
					/* eslint no-console:0 */
					console.log({ info: 'could not add user to concept', conceptId, err });
				}
				myft.init().then(addUserToConcept).catch(logError);
				//enerateSuccessHtmlContent(); // This may not be the place where to call the confirmation message
			}
			// FIXME remove this debugging line after test
			/* eslint no-console:0 */
			console.log({ info: 'developer: one-click daily digest setup' });
			return false;
		}

		const link = banner.innerElement.querySelector('[data-n-messaging-action]');
		link.addEventListener('click', handleSignUpClick);
	}

	done();

};
