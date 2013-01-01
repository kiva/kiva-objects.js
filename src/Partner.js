kiva.Partners = kiva.RequestObject.extend({
	name: 'Partners'
	, kivaSrc: kiva.kivaSrc + '/partners'
	, zipSrc: kiva.zipSrc + '/partners'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

