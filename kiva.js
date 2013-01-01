/**
 * kiva.js - v0.1.0 - 2012-10-26 3:59:23 PM
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


	, plurals: {}


	, pluralize: function (objectName) {

	}


	, buildUrl: function (args) {
		var ids
		, action
		, params
		, url = [this.kivaSrc];


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

kiva.JournalEntries = kiva.RequestObject.extend({
	name: 'JournalEntries'
	, kivaSrc: kiva.kivaSrc + '/journal_entries'
	, zipSrc: kiva.zipSrc + '/journal_entries'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.JournalEntries.Comments = kiva.RequestObject.extend({
	name: 'Comments'
	, kivaSrc: kiva.kivaSrc + '/journal_entries'
	, kivaSrcSuffix: 'comments'
	, zipSrc: kiva.zipSrc + '/journal_entries'
	, zipSrcSuffix: 'comments'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.Lenders = kiva.RequestObject.extend({
	name: 'Lenders'
	, kivaSrc: kiva.kivaSrc + '/lenders'
	, zipSrc: kiva.zipSrc + '/lenders'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.Lenders.Loans = kiva.RequestObject.extend({
	name: 'Loans'
	, kivaSrc: kiva.kivaSrc + '/lenders'
	, kivaSrcSuffix: 'loans'
	, zipSrc: kiva.zipSrc + '/lenders'
	, zipSrcSuffix: 'loans'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.Lenders.Teams = kiva.RequestObject.extend({
	name: 'Teams'
	, kivaSrc: kiva.kivaSrc + '/lenders'
	, kivaSrcSuffix: 'teams'
	, zipSrc: kiva.zipSrc + '/lenders'
	, zipSrcSuffix: 'teams'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
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

kiva.Loans.JournalEntries = kiva.RequestObject.extend({
	name: 'JournalEntries'
	, kivaSrc: kiva.kivaSrc + '/loans'
	, kivaSrcSuffix: 'journal_entries'
	, zipSrc: kiva.zipSrc + '/loans'
	, zipSrcSuffix: 'journal_entries'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.Loans.Lenders = kiva.RequestObject.extend({
	name: 'Lenders'
	, kivaSrc: kiva.kivaSrc + '/loans'
	, kivaSrcSuffix: 'lenders'
	, zipSrc: kiva.zipSrc + '/loans'
	, zipSrcSuffix: 'lenders'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.Loans.Updates = kiva.RequestObject.extend({
	name: 'Updates'
	, kivaSrc: kiva.kivaSrc + '/loans'
	, kivaSrcSuffix: 'updates'
	, zipSrc: kiva.zipSrc + '/loans'
	, zipSrcSuffix: 'updates'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.Partners = kiva.RequestObject.extend({
	name: 'Partners'
	, kivaSrc: kiva.kivaSrc + '/partners'
	, zipSrc: kiva.zipSrc + '/partners'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.Teams = kiva.RequestObject.extend({
	name: 'Teams'
	, kivaSrc: kiva.kivaSrc + '/teams'
	, zipSrc: kiva.zipSrc + '/teams'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.Teams.Lenders = kiva.RequestObject.extend({
	name: 'Lenders'
	, kivaSrc: kiva.kivaSrc + '/teams'
	, kivaSrcSuffix: 'lenders'
	, zipSrc: kiva.zipSrc + '/teams'
	, zipSrcSuffix: 'lenders'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

kiva.Teams.Loans = kiva.RequestObject.extend({
	name: 'Loans'
	, kivaSrc: kiva.kivaSrc + '/teams'
	, kivaSrcSuffix: 'loans'
	, zipSrc: kiva.zipSrc + '/teams'
	, zipSrcSuffix: 'loans'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

}(jQuery, this));
