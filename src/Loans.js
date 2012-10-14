(function ($) {
	kiva.Loans = kiva.RequestObject.extend({
		name: 'Loans'
		, kivaSrc: kiva.kivaSrc + '/loans'
		, zipSrc: kiva.zipSrc + '/loans'
		, fetch: function (args) {
			//return this.__proto__.fetch.call(this, args);
		}
	});
}(jQuery));