kiva.RequestObject = kiva.Object.extend({

	name: 'RequestObject'

	, kivaSrc: kiva.kivaSrc

	, zipSrc: kiva.zipSrc

	, members: []


	/**
	 *
	 * @param args
	 * @returns jQuery.Deferred
	 */
	, fetch: function (args) {
		var ids, action, self, $result
		, url = this.kivaSrc;


		/**
		 * - args.action is not required but when its there, you can have at most, one id
		 * - args.ids is not required but when it's more than one it can not have an action
		 * - args.ids can only have an action when there is only one args.id
		 * - it is also possible to have 0 args
		 *
		 *
		 */

		if (args) {
			ids = args.ids;
			action = args.action;

			if (ids && !$.isArray(ids)) {
				throw 'Error: "ids" must be an array';
			}

			if (action) {
				ids = ids ? ids[0] + '/' : '';
				url = url + '/' + ids + action;
			} else {
				url = url + '/' + ids.join(',');
			}
		}

		url = url + '.json';

		$result = $.getJSON(url);

		self = this;
		$result.done(function (response) {
			self.members = response[self.name.toLowerCase()];
		});

		return $result;
	}
});

