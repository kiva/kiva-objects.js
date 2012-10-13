describe('.Loans', function () {
	it('exists', function () {
		var loans = kiva.Loans.create();
		var $fetchedResults = loans.fetch({ids: [938, 4803]});

		expect(kiva.Loans).toBeDefined();

		// Is it a jqXhr?
		expect($fetchedResults.promise && $fetchedResults.complete).toBeDefined();
	});

	describe('.fetch()', function () {
		var loans = kiva.Loans.create();
		var $fetchedResults = loans.fetch({ids: [938, 4803]});

		//expect(loans.members.length).toBe(5);
	});
});