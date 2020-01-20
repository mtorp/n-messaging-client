import myFtClient from 'next-myft-client';
import getToken from './get-token';

export default function signUp (conceptTitle, directType, conceptId) {
	// reused & simplified code from myFT's digest promo
	function addToDigest () {
		const csrfToken = getToken();
		const metaConcept = {
			name: conceptTitle
		};

		if (directType) {
			metaConcept.directType = directType;
		}

		const metaEmail = {
			_rel: {
				type: 'daily',
				timezone: 'Europe/London'
			}
		};

		const promises = [myFtClient.add('user', null, 'preferred', 'preference', 'email-digest', Object.assign({}, {token: csrfToken}, metaEmail))];

		if (conceptId) {
			promises.push(myFtClient.add('user', null, 'followed', 'concept', conceptId, Object.assign({}, {token: csrfToken}, metaConcept)));
		}

		return Promise.all(promises);
	}

	myFtClient.init()
		.then(addToDigest);
}
