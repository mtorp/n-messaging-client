import { client as myft } from 'n-myft-ui/myft';
import getCsrfToken from 'n-myft-ui/myft/ui/lib/get-csrf-token';

export default function signup () {
	return myft.init()
		.then(addUserToDigest);
}

function addUserToDigest () {
	const csrfToken = getCsrfToken();
	return myft.add('user', null, 'preferred', 'preference', 'email-digest', {
		token: csrfToken,
		_rel: {
			type: 'daily',
			sendTime:'every morning'
		}
	});
}
