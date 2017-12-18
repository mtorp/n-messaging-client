module.exports = function (params) {
	// fetch from next-messaging-client
	// include: 'same-origin'
	// params: {
	// 	messageName
	// }
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(Object.assign({}, {
				theme: ['marketing'],
				contentLong: 'Try the new compact homepage. A list view of today\'s homepage with fewer images.',
				contentShort: 'Try the new compact homepage.',
				buttonLabel: 'Try it now',
				buttonUrl: '#try-button',
				linkLabel: 'Give feedback',
				linkUrl: '#feedback-link'
			}, params));
		}, 2000);
	});
}
