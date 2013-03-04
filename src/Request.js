kiva.Request = kiva.Object.extend({

	name: 'Request'
	, kivaSrc: kiva.kivaSrc
	, zipSrc: kiva.zipSrc
	, content: {}
    , _status: ''


	, buildUrl: function (args) {
		var ids, action, entity
		, url = [this.kivaSrc, this.name.toLowerCase()];

		if (args) {
			if ($.isArray(args)) {
				ids = args;
			} else if (typeof args == 'number') {
				ids = [args];
			} else {
				ids = args.ids;
				action = args.action;
                entity = args.entity;
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

            if (entity) {
                url.push(entity);
            }
		}

		return url.join('/') + '.json';
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
	 * Loads data onto the Entity
	 *
	 * @param {Object} data
	 */
	, load: function (data) {
		this.content = $.extend(this.content, data);
		this.status('loaded', data);
	}


	/**
	 *
	 * @param ids
	 * @returns {kiva.Request}
	 */
	, fetch: function (args) {
		var _this = this
        , params = args.params || {};

		this.status('fetching');
		this.jqXhr = $.getJSON(this.buildUrl(args), params)
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
