/*! kiva.js - v0.1.0 - 2012-10-15
* http://kiva.org/
* Copyright (c) 2012 kiva.org; Licensed MIT */


(function (global) {
	'use strict';

	var  version = 1
	, kivaApiVersion = 1
	, zipApiVersion = 1
	, kivaHost = 'api.kivaws.org'
	, zipHost = 'zip.kiva.org'

	, kivaPath = '/v'
	, zipPath = '/v';


	/**
	 * @type {Object}
	 */
	global.kiva = {
		ver: version
		, kVer: kivaApiVersion
		, zVer: zipApiVersion
		, kivaSrc: 'http://' + kivaHost + kivaPath + kivaApiVersion
		, zipSrc: 'http://' + zipHost + zipPath + zipApiVersion
	};

}(this));
(function ($) {
	'use strict';

	kiva.Lenders = kiva.Object.extend({
		name: 'Lenders'
		, kivaSrc: kiva.kivaSrc + '/lenders'
		, zipSrc: kiva.zipSrc + '/lenders'
		, fetch: function (args) {
			return kiva.RequestObject.prototype.fetch.call(this, args);
		}
	});
}(jQuery));

(function ($) {
	'use strict';

	kiva.Loans = kiva.RequestObject.extend({
		name: 'Loans'
		, kivaSrc: kiva.kivaSrc + '/loans'
		, zipSrc: kiva.zipSrc + '/loans'
		, fetch: function (args) {
			return kiva.RequestObject.prototype.fetch.call(this, args);
		}
	});
}(jQuery));

(function ($) {
	'use strict';

	// @todo Probably need to revisit this code
	// @hack to get around jshint (https://github.com/jshint/jshint/issues/525)
	var Fn = Function;


	/**
	 *
	 * @constructor
	 */
	kiva.Object = function () {};


	/**
	 * Creates a new Constructor function that "inherits" from "this".
	 *
	 * @param args
	 * @return {*}
	 */
	kiva.Object.extend = function (args) {
		var Child = args && args.name
			? new Fn ('return function ' + args.name + ' () {}')()
			: function () {};

		Child.prototype = $.extend({}, this.prototype, args);
		Child.prototype.__proto__ = this.prototype;
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
		// @todo again, this if for jshint...
		var This = this;
		var newObj = new This();

		return $.extend(newObj, args);
	};

}(jQuery));


(function () {
	'use strict';

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
			var url = this.kivaSrc
			, ids
			, action
			, self;

			if (args) {
				ids = args.ids;
				action = args.action;

				if ($.isArray(ids)) {
					url = url + '/' + ids.join(',');
				} else if (ids) {
					throw 'Error: ids must be an array';
				}

				if (action) {
					url = url + '/' + action;
				}

				url = url + '.json';
			}

			var $result = $.getJSON(url);

			if (this.members) {
				self = this;

				$result.done(function (response) {
					self.members = response[self.name.toLowerCase()];
				});
			}

			return $result;
		}
	});

}());

