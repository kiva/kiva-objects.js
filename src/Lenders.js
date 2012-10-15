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