const SlotPresenter = require('../presenters/slot-presenter');

module.exports = (context, options) => {
	if (options.hash) Object.assign(context, options.hash);
	if (options.data) {
		let nMessagingPresenter = new SlotPresenter(context);
		return options.fn(context, { data: { nMessagingPresenter } } );
	}
};
