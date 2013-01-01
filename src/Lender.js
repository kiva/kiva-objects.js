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

