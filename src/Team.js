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

