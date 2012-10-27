<<<<<<< HEAD:src/Lender.js
kiva.Lenders = kiva.RequestObject.extend({
	name: 'Lenders'
=======
kiva.Lender = kiva.Model.extend({
	name: 'Lender'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
>>>>>>> Big changes:src/Model/Lender.js
});
