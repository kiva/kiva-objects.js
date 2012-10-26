kiva.Loans = kiva.RequestObject.extend({
	name: 'Loan'
	, kivaSrc: kiva.kivaSrc + '/loans'
	, zipSrc: kiva.zipSrc + '/loans'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

