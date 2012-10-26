kiva.RequestObject = kiva.Object.extend({

	name: 'RequestObject'

	, kivaSrc: kiva.kivaSrc


	, zipSrc: kiva.zipSrc


	, members: []


	, plurals: {}


	, pluralize: function (objectName) {

	}


	, buildUrl: function (args) {
		var ids, action
		, url = [this.kivaSrc, this.name.toLowerCase()];

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
				if (ids) {
					url.push(ids[0]);
				}

				url.push(action);
			} else {
				ids = ids.join(',');
				url.push(ids);
			}
		}

		return url.join('/') + '.json';
	}


	/**
	 *
	 * @param args
	 * @returns jQuery.Deferred
	 */
	, fetch: function (args) {
		var _this = this
		, $result = $.getJSON(this.buildUrl(args));

		return $result.done(function (response) {
			_this.members = response[_this.name.toLowerCase()];
		});
	}
});

