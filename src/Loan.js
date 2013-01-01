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

