kiva.Model = kiva.Object.extend({

	name: 'RequestObject'

	, kivaSrc: kiva.kivaSrc


	, zipSrc: kiva.zipSrc


	, members: []


	, plurals: {}


	, _status: ''


	, content: {}


	/**
	 *
	 * @param {String} name
	 */
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
	 * @param {String} status
	 * @param {Object} [data]
	 */
	, status: function (status, data) {
		if (status && (this._status != status)) {
			this._status = status;
		}

		return this._status;
	}


	/**
	 * Loads data onto the Model
	 *
	 * @param {Object} data
	 */
	, load: function (data) {
		this.content = $.extend(this.content, data);
		this.status('loaded', data);
	}


	/**
	 *
	 * @param args
	 * @returns {kiva.Model}
	 */
	, fetch: function (args) {
		var _this = this;

		this.status('fetching');
		this.jqXhr = $.getJSON(this.buildUrl(args))
				.progress(function () {
					_this.status('progress')
				})
				.fail(function () {
					_this.status('failed');
				})
				.done(function (response) {
					_this.load(response[_this.name.toLowerCase()])
				});

		return this;
	}
});
