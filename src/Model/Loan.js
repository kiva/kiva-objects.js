<<<<<<< HEAD:src/Loan.js
kiva.Loans = kiva.RequestObject.extend({
	name: 'Loans'
});
=======
kiva.Loans = kiva.Model.extend({
	name: 'Loan'
	, fetch: function (args) {
		return kiva.RequestObject.prototype.fetch.call(this, args);
	}
});

>>>>>>> Big changes:src/Model/Loan.js
