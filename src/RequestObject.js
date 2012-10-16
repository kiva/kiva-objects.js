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

		if (args) {
			if ($.isArray(args)) {
				ids = args;
			} else if (typeof args == 'number') {
				ids = [args];
			} else {
				ids = args.ids;
				action = args.action;
			}

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

