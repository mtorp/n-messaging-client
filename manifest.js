module.exports = {
	licenceJoinPromptSsiClient: { // name of flag variant and must match the messageId in ammit-api
		path: 'bottom/lazy', // path to template
		lazy: true
	},
	ssiSurvey: {
		path: 'bottom/secondary-school-survey'
	},
	cookieConsentA: {
		path: 'bottom/cookie-consent'
	},
	cookieConsentB: {
		path: 'bottom/cookie-consent'
	},
	cookieConsentC: {
		path: 'bottom/cookie-consent'
	},
	swgEntitlementsPrompt: {
		path: 'bottom/swg-entitlements-prompt'
	},
	marketingPopupPrompt: {
		path: 'bottom/lazy',
		lazy: true,
		// Temporary 25% off offer. Related to priceIncreaseTest2020 work.
		guruQueryString: 'offerId=2a6a4586-ace0-6465-aebe-aa1ecc543271'
		// guruQueryString: 'offerId=c1773439-53dc-df3d-9acc-20ce2ecde318'
	},
	paymentFailure: {
		path: 'top/payment-failure'
	},
	teamTrial: {
		path: 'bottom/team-trial'
	},
	anonSubscribeNow: {
		path: 'top/anon-subscribe-now'
	},
	ukElection: {
		path: 'top/uk-election'
	},
	printBannerUsa: {
		path: 'top/print-banner-usa'
	},
	navAccountSettings: {
		path: 'top/nav-account-settings',
		tooltip: true
	},
	onboardingMyFt: {
		path: 'bottom/onboarding-myft'
	},
	onboardingPremium: {
		path: 'bottom/onboarding-premium'
	},
	onboardingRegion: {
		path: 'top/onboarding-region',
		tooltip: true
	},
	bookYourConsult: {
		path: 'bottom/book-your-consult'
	},
	b2bTrialNewsletter: {
		path: 'bottom/lazy',
		lazy: true
	},
	b2bTrialMyFt: {
		path: 'bottom/lazy',
		lazy: true
	},
	b2bTrialCountdown: {
		path: 'top/lazy',
		lazy: true
	},
	b2bTrialContactUs: {
		path: 'bottom/b2b-trial-contact-us'
	},
	b2bTrialMember: {
		path: 'bottom/b2b-trial-member',
		lazy: true
	},
	b2bTrialMobile: {
		path: 'bottom/b2b-trial-mobile'
	},
	techScrollAsia: {
		path: 'bottom/tech-scroll-asia'
	},
	b2bTrialAnon: {
		path: 'bottom/lazy',
		lazy: true
	},
	appPromoMobile: {
		path: 'bottom/app-promo-mobile'
	},
	contentMessage: {
		path: 'bottom/content-message'
	},
	b2cTrialAcquisitions: {
		path: 'bottom/lazy',
		lazy: true
	},
	b2cSubAcquisitions: {
		path: 'bottom/lazy',
		lazy: true
	},
	ftWeekendPromo: {
		path: 'bottom/lazy',
		lazy: true,
		eventRules: {maxOccurrences: {act: 1, view: 3, close:1}}
	},
	giftArticles: {
		path: 'top/gift-articles',
		tooltip: true
	},
	myFtFeedpage: {
		path: 'top/my-ft-feedpage',
		tooltip: true
	},
	myftDisengagedTooltip: {
		path: 'top/myft-disengaged-tooltip',
		tooltip: true
	},
	nbeAutoSub: {
		path: 'top/nbe-auto-sub'
	},
	dailyDigest: {
		path: 'bottom/daily-digest'
	},
	newsletterPromo: {
		path: 'bottom/lazy',
		lazy: true
	},
	myFtFeedpageOverview : {
		path: 'bottom/lazy',
		lazy: true
	},
	fastFt : {
		path: 'bottom/fast-ft'
	},
	marketsData : {
		path: 'bottom/markets-data'
	},
	dailyDigestTest : {
		path: 'bottom/lazy',
		lazy: true
	},
	myFtAccountTopicRecs: {
		path: 'bottom/myft-account-topic-recs',
		lazy: true
	},
	usElection2020Promo: {
		path: 'bottom/us-election-2020-promo'
	}
};
