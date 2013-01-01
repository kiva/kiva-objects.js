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

