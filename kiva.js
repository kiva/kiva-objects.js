/**
 * kiva.js - v0.1.0 - 2012-10-16 1:45:06 PM
 * http://kiva.org/
 * Copyright (c) 2012 kiva.org
 */

(function ($, global, undefined) {
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


kiva.Loans = kiva.RequestObject.extend({
	name: 'Loans'
	, kivaSrc: kiva.kivaSrc + '/loans'
	, zipSrc: kiva.zipSrc + '/loans'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});


kiva.Lenders = kiva.Object.extend({
	name: 'Lenders'
	, kivaSrc: kiva.kivaSrc + '/lenders'
	, zipSrc: kiva.zipSrc + '/lenders'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});




}(jQuery, this));