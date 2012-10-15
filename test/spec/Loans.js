/*global afterEach, beforeEach, describe, expect, it, jasmine, runs, spyOn, waits, waitsFor, xdescribe, xit */
describe('.Loans', function () {
	'use strict';

	it('exists', function () {
		expect(kiva.Loans).toBeDefined();
	});

	describe('instance method: .fetch()', function () {

		it('does stuff then calls the parent constructor\'s "fetch" method', function () {
			var loans = kiva.Loans.create();

			spyOn(kiva.RequestObject.prototype, 'fetch');
			loans.fetch([8930, 84930, 28472]);

			expect(kiva.RequestObject.prototype.fetch).toHaveBeenCalled();
		});
	});
});