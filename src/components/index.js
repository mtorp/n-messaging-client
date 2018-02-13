const inviteColleagues = require('./invite-colleagues/main');
const appBanner = require('./desktop-app-banner/main');
const anonSubscribe = require('./anon-subscribe-now-teal/main');
const overlay = require('./ad-blocker-overlay/main');

module.exports = {
	b2bUpsellBanner: inviteColleagues,
	appPromotingBanner: appBanner,
	anonSubscribeNow: anonSubscribe,
	adBlockerOverlay: overlay
};
