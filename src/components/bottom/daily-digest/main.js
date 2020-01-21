import myft from 'next-myft-client';

module.exports = function customSetup (banner, done) {

	function handleSignUpClick (evt) {
		if (window.FT && window.FT.flags && window.FT.flags.oneClickDailyDigest) {
			evt.preventDefault();
			const conceptId = document.documentElement.dataset.conceptId;
			if (conceptId) {
				function addUserToConcept () {
					return myft.add('user', null, 'followed', 'concept', conceptId);
				}
				function logError (err) {
					/* eslint no-console:0 */
					console.log({ info: 'could not add user to cocnept', conceptId, err });
				}
				myft.init().then(addUserToConcept).catch(logError);
			}
			// FIXME remove this debugging line after test
			/* eslint no-console:0 */
			console.log({ info: 'developer: one-click daily digest setup' });
			return false;
		}
	}

	const link = banner.innerElement.querySelector('[data-n-messaging-action]');
	link.addEventListener('click', handleSignUpClick);

	done();

};
