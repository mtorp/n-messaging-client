import Tooltip from 'o-tooltip';
import myftClient from 'next-myft-client';

const myftHeaderLogo = document.querySelector('[data-trackable="my-ft"]');

module.exports = (banner, done) => {
	if (!myftHeaderLogo) return done();
	myftClient.init([{ relationship: 'followed', type: 'concept' }]);
	return myftClient.getAll('followed', 'concept')
		.then(followedConcepts => {
			if (followedConcepts.length) {
				const concepts = followedConcepts
					.sort((a, b) => b.lastPublished - a.lastPublished)
					.map(({name}) => `<span style="no-wrap">${name}</span>`)
					.slice(0, 3);
				let content = 'Read the latest';

				if (concepts.length === 3) {
					content += ` ${concepts.shift()}, `;
				}

				content += concepts.join(' and ');
				content += ' stories.';

				const tooltip = new Tooltip(myftHeaderLogo, {
					target: 'myft-header-tooltip',
					content: content,
					showOnConstruction: true,
					position: 'below'
				});
				tooltip.tooltipEl.classList.add('n-messaging-client-tooltip');
				tooltip.tooltipEl.querySelector('.n-alert-banner__content-main').classList.add('n-alert-banner--alert-bleed');
				tooltip.tooltipEl.addEventListener('oTooltip.close', () => {
					banner.close();
				});
				done();
			}
		})
		.catch(done);
};
