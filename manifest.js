module.exports = {
	licenceJoinPromptSsiClient: { // name of flag variant
		path: 'bottom/lazy', // path to template
		messageId: 'licenceJoinPromptSsiClient' // id as specified in ammit-api
	},
	inviteColleagues: {
		path: 'bottom/invite-colleagues',
		messageId: 'inviteColleagues'
	},
	appPromotingBanner: {
		path: 'bottom/app-promoting-banner',
		messageId: 'appPromotingBanner'
	},
	cookieConsentA: {
		path: 'bottom/cookie-consent',
		messageId: 'cookieConsentA'
	},
	cookieConsentB: {
		path: 'bottom/cookie-consent',
		messageId: 'cookieConsentB'
	},
	cookieConsentC: {
		path: 'bottom/cookie-consent',
		messageId: 'cookieConsentC'
	},
	marketingPopupPrompt: {
		path: 'bottom/lazy',
		messageId: 'marketingPopupPrompt',
		guruQueryString: 'offerId=c1773439-53dc-df3d-9acc-20ce2ecde318'
	},
	paymentFailure: {
		path: 'top/payment-failure',
		messageId: 'paymentFailure'
	},
	teamTrial: {
		path: 'top/team-trial',
		messageId: 'teamTrial'
	},
	anonSubscribeNow: {
		path: 'top/anon-subscribe-now-teal',
		messageId: 'anonSubscribeNow',
	},
	navAccountSettings: {
		path: 'top/nav-account-settings',
		messageId: 'navAccountSettings',
		tooltip: true
	},
	tlsDeprecation: {
		path: 'top/tls-deprecation',
		messageId: 'tlsDeprecation'
	},
	deloitteSubscription: {
		path: 'top/deloitte-subscription',
		messageId: 'deloitteSubscription'
	}
};
