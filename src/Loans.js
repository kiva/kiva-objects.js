(function ($) {
	kiva.Loans = kiva.Object.extend({
		name: 'Loans'
		, kivaSrc: kiva.kivaSrc + '/loans'
		, zipSrc: kiva.zipSrc + '/loans'
		, fetch: function (args) {
			return kiva.Object.prototype.fetch.call(this, args);
		}
	});
}(jQuery));