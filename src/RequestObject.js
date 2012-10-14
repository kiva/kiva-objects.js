(function () {

	kiva.RequestObject = kiva.Object.extend({

		kivaSrc: kiva.kivaSrc

		, zipSrc: kiva.zipSrc


		, members: []


		/**
		 *
		 * @param args
		 * @returns jQuery.Deferred
		 */
		, fetch: function (args) {
			var ids
			, action
			, url = this.kivaSrc;

			if (args) {
				ids = args.ids;
				action = args.action;

				if ($.isArray(ids)) {
					url = url + '/' + ids.join(',');
				} else if (ids) {
					throw 'Error: ids must be an array';
				}

				if (action) {
					url = url + '/' + action
				}

				url = url + '.json';
			}

			var $result = $.getJSON(url);

			if (this.name) {
				var self = this;
				$result.done(function (response) {
					self.members = response[self.name.toLowerCase()];
				});
			}

			return $result;
		}
	});

}());