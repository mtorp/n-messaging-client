import {Component, createElement, render} from 'preact';
import {client as myft} from 'n-myft-ui/myft';
import getCsrfToken from 'n-myft-ui/myft/ui/lib/get-csrf-token';
import {FollowButton} from '@financial-times/x-follow-button';

class MultipleFollowButtons extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isFollowed: {}
		};
		myft.init();
	}
	onFollowClick (detail) {
		myft[detail.action](detail.actorType, detail.actorId, detail.relationshipName, detail.subjectType, detail.subjectId, { token: detail.token })
			.then(() => {
				// send tracking events
				if (detail.action === 'add') {
					this.props.trackEventAction('act', detail.subjectId);
				}
				// update view component's isFollowed state
				const replacement = Object.assign({}, this.state.isFollowed);
				if (detail.action === 'add') {
					replacement[detail.subjectId] = true;
				} else {
					replacement[detail.subjectId] = false;
				}
				this.setState({ isFollowed: replacement });
			});
	}
	createFollowButton (topicId, topicName, isFollowed, csrfToken) {
		const followButton = createElement(FollowButton, {
			conceptId: topicId,
			conceptName: topicName,
			conceptNameAsButtonText: true,
			isFollowed,
			csrfToken,
			variant: 'inverse',
			onSubmit: this.onFollowClick.bind(this)
		});
		const oBannerAction = createElement('div', {className: 'o-banner__action'}, followButton);
		return oBannerAction;
	}
	render () {
		const followButtons = [];
		for (let i = 0; i < this.props.topicIds.length; i++) {
			const followButton = this.createFollowButton(this.props.topicIds[i], this.props.topicNames[i], this.state.isFollowed[this.props.topicIds[i]], this.props.csrfToken);
			followButtons.push(followButton);
		}
		return followButtons;
	}
}

export default function customSetup (banner, done, guruResult, trackEventAction) {
	banner.bannerElement.classList.add('o-banner--small', 'n-messaging-client--one-click-myft-buttons');

	// remove original follow button
	const actions = banner.bannerElement.querySelector('.o-banner__actions');
	const originalButton = banner.innerElement.querySelector('.o-banner__action');
	originalButton.parentNode.removeChild(originalButton);

	// move explore myFT link to a separate actions block
	const exploreMoreAction = banner.innerElement.querySelector('.o-banner__action--secondary');
	exploreMoreAction.parentNode.removeChild(exploreMoreAction);
	const secondaryActions = document.createElement('div');
	secondaryActions.classList.add('o-banner__actions');
	secondaryActions.appendChild(exploreMoreAction);
	banner.innerElement.appendChild(secondaryActions);

	// create the multiple follow buttons
	const csrfToken = getCsrfToken();
	const topicIds = guruResult.renderData.topicIds || [];
	const topicNames = guruResult.renderData.topicNames || [];
	const followButtons = createElement(MultipleFollowButtons, { topicIds, topicNames, csrfToken, trackEventAction });
	render(followButtons, actions);

	done();
}
