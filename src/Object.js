(function ($) {

	/**
	 *
	 * @constructor
	 */
	kiva.Object = function () {};


	/**
	 * Creates a new Constructor function that "inherits" from "this".
	 *
	 * @param args
	 * @return Constructor
	 */
	kiva.Object.extend = function (args) {
		var Child = args && args.name
			? new Function ('return function ' + args.name + ' () {}')()
			: function () {};

		Child.prototype = $.extend({}, this.prototype, args);
		Child._super = this;
		Child = $.extend(Child, this);

		return Child;
	};


	/**
	 * Creates a new object that inherits from "this"
	 *
	 * @param args
	 */
	kiva.Object.create = function (args) {
		var newObj = new this();

		newObj.members = [];
		return $.extend(newObj, args);
	};



	kiva.Object.prototype = {

		/**
		 *
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
	};

}(jQuery));