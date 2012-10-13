(function ($, global, undefined) {
	'use strict';

	var  version = 1
	, kivaApiVersion = 1
	, zipApiVersion = 1

	, kivaHost = 'api.kivaws.org'
	, zipHost = 'zip.kiva.org'

	, kivaPath = '/v'
	, zipPath = '/v'

	, kiva = {
		ver: version
		, kVer: kivaApiVersion
		, zVer: zipApiVersion
		, kivaSrc: 'http://' + kivaHost + kivaPath + kivaApiVersion
		, zipSrc: 'http://' + zipHost + zipPath + zipApiVersion
	};


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


	kiva.Loans = kiva.Object.extend({
		name: 'Loans'
		, kivaSrc: kiva.kivaSrc + '/loans'
		, zipSrc: kiva.zipSrc + '/loans'
		, fetch: function (args) {
			return kiva.Object.prototype.fetch.call(this, args);
		}
	});


	kiva.Lenders = kiva.Object.extend({
		name: 'Lenders'
		, kivaSrc: kiva.kivaSrc + '/lenders'
		, zipSrc: kiva.zipSrc + '/lenders'
		, fetch: function (args) {
			var ids
			, validActions;

			if (! args) {
				throw 'argument is missing';
			}

			if ($.isArray(args.ids)) {
				ids = args.ids;
				validActions = [];
			} else if (typeof args.id == 'number') {
				ids = [args.id];

				delete args.id;
				validActions = ['loans', 'teams'];
			} else {
				validActions = ['newest', 'search'];
			}

			if (args.action && $.inArray(args.action, validActions) == -1) {
				throw 'Error: ' + args.action + ' is an invalid action';
			}

			args.ids = ids;
			return kiva.Object.prototype.fetch.call(this, args);
		}
	});


	global.kiva = kiva;

}(jQuery, this));