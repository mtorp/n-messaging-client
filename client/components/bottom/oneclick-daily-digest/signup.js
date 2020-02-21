import myftClient from 'next-myft-client/myft-bower';

const addUserToDigest = async () => {
	return await myftClient.add('user', null, 'preferred', 'preference', 'email-digest', {
		_rel:{
			type: 'daily',
			sendTime:'every morning'
		}
	});
};

export default async () => {
	await myftClient.init();
	return await addUserToDigest();
};