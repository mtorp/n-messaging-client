import signUp from './sign-up';

module.exports = function customSetup (banner, done) {
	const button = banner.innerElement.querySelector('[data-n-messaging-action]');

	function handleSignUpClick (evt) {
		evt.preventDefault();
		// FIXME replace the hardcoded test arguments
		signUp('World', 'http://www.ft.com/ontology/Topic', '82645c31-4426-4ef5-99c9-9df6e0940c00');
		return false;
	};

	button.addEventListener('click', handleSignUpClick);
	done();
};
