describe('.Loans', function () {
	it('exists', function () {
		expect(kiva.Loans).toBeDefined();
	});

	describe('.fetch()', function () {
		var loans = kiva.Loans.create();
		var $fetchedResults = loans.fetch({ids: [938, 4803]});

		//expect(loans.members.length).toBe(5);
	});
});