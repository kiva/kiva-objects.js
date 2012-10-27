kiva.RequestObject = kiva.Object.extend({

	name: 'RequestObject'

	, kivaSrc: kiva.kivaSrc


	, zipSrc: kiva.zipSrc


	, members: []


	, plurals: {}


	, pluralize: function (name) {
		var plural = this.plurals[name];

		// Allows for custom pluralization + prevent pluralizing what's already been pluralized
		if (! plural){
			plural = name + 's';
			this.plurals[plural] = plural;
		}

		return plural
	}


	, buildUrl: function (args) {
		var ids, action
		, url = [this.kivaSrc, this.pluralize(this.name.toLowerCase())];

		if (args) {
			if ($.isArray(args)) {
				ids = args;
			} else if (typeof args == 'number') {
				ids = [args];
			} else {
				ids = args.ids;
				action = args.action;
				params = args.params;
			}

			if (ids && !$.isArray(ids)) {
				throw 'Error: "ids" must be an array';
			}

			if (action) {
				if (ids) {
					url.push(ids[0]);
				}

				url.push(action);
			} else if (ids) {
				ids = ids.join(',');
				url.push(ids);
			}
		}

		if (this.kivaSrcSuffix) {
			url.push(this.kivaSrcSuffix);
		}
		
		url = url.join('/') + '.json';

		if (params) {
			url += '?';
			$.each(params, function (key, val) {
				url += key + '=' + val + '&';
			});
				
		}

		return url;
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
