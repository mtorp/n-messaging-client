import myft from 'next-myft-client';

module.exports = function customSetup (banner, done) {
	if (window.FT && window.FT.flags && window.FT.flags.oneClickDailyDigest) {
		function generateSuccessHtmlContent () {
			const parent1Elements = banner.bannerElement.querySelector('.o-banner__content');
			const childElement1 = document.createElement('div');
			childElement1.innerHTML = '&#10004;<strong>&ensp;&ensp;Great! You\'re all set for the daily Email Digest.</strong> Get even more FT content deliverd straight to your inbox';
			childElement1.style.color = '#00572C';
			childElement1.style.fontSize = '16px';
			childElement1.style.margin = '16px 24px 16px 0px';
			parent1Elements.parentNode.replaceChild(childElement1, parent1Elements);

			const parent2Elements = banner.bannerElement.querySelector('.o-banner__actions');
			const childElement2 = document.createElement('div');
			childElement2.classList.add('o-banner__action');
			childElement2.innerHTML = '<a href="https://www.ft.com/newsletters" target="_blank" class="o-banner__link-browse-news-letter"> Browse all newsletters </a>';
			parent2Elements.parentNode.replaceChild(childElement2, parent2Elements);

			const grandParentElement = banner.bannerElement;
			grandParentElement.querySelector('.o-banner__outer').style.background='#CCDFC7';
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
				generateSuccessHtmlContent(); // This may not be the place where to call the confirmation message
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
