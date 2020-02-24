import { client as myft } from 'n-myft-ui/myft';
import getCsrfToken from 'n-myft-ui/myft/ui/lib/get-csrf-token';
const csrfToken = getCsrfToken();

const addUserToDigest = () => {
	return myft.add('user', null, 'preferred', 'preference', 'email-digest', { csrfToken,
		_rel: {
			type: 'daily',
			sendTime:'every morning'
		}
	});
};

export default () => {
	myft.init();
	return addUserToDigest().then(true);
};
