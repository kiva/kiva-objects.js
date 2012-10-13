(function ($) {
	kiva.Lenders = kiva.Object.extend({
		name: 'Lenders'
		, kivaSrc: kiva.kivaSrc + '/lenders'
		, zipSrc: kiva.zipSrc + '/lenders'
		, fetch: function (args) {
			var ids
			, validActions;

			if (! args) {
				throw 'argument is missing';
			}

			if ($.isArray(args.ids)) {
				ids = args.ids;
				validActions = [];
			} else if (typeof args.id == 'number') {
				ids = [args.id];

				delete args.id;
				validActions = ['loans', 'teams'];
			} else {
				validActions = ['newest', 'search'];
			}

			if (args.action && $.inArray(args.action, validActions) == -1) {
				throw 'Error: ' + args.action + ' is an invalid action';
			}

			args.ids = ids;
			return kiva.Object.prototype.fetch.call(this, args);
		}
	});
}(jQuery));