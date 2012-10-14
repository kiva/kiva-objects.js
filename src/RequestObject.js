(function () {

	kiva.RequestObject = kiva.Object.extend({

		/**
		 *
		 * @param args
		 * @returns jQuery.Deferred
		 */
		fetch: function (args) {
			if (! (this.kivaSrc || this.zipSrc)) {
				throw 'Error: You must define a kivaSrc and/or zipSrc'
			}

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