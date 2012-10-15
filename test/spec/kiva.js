/*global afterEach, beforeEach, describe, expect, it, jasmine, runs, spyOn, waits, waitsFor, xdescribe, xit */
describe('kiva.js', function () {
	'use strict';

	it('has a pointer to the Kiva API base url', function () {
		expect(kiva.kivaSrc).toBeDefined();
	});

	it('has a pointer to the Kiva Zip API base url', function () {
		expect(kiva.zipSrc).toBeDefined();
	});

	it('stores version numbers for this library as well as the API\'s to use with Kiva and Kiva Zip', function () {
		expect(kiva.ver).toBeDefined();
		expect(kiva.kVer).toBeDefined();
		expect(kiva.zVer).toBeDefined();
	});
});