/*global afterEach, beforeEach, describe, expect, it, jasmine, runs, spyOn, waits, waitsFor, xdescribe, xit */
describe('.RequestObject', function () {
	'use strict';

	// @todo might need to make this more specific
	it('stores a reference to the Kiva and Kiva Zip API', function () {
		expect(typeof kiva.RequestObject.prototype.kivaSrc == 'string').toBe(true);
		expect(typeof kiva.RequestObject.prototype.zipSrc == 'string').toBe(true);
	});


	it('sets some default properties', function () {
		var myObj = kiva.RequestObject.create();

		expect($.isArray(myObj.members)).toBe(true);
	});


	describe('instance method: .fetch()', function () {
		var mockJqXhr = {
			done: function (doneCallback) {
				doneCallback.call({}, {requestobject: 'my request result'})
			}
		};

		it ('Makes an $.ajax call and returns the jqXHR results', function () {
			var obj = kiva.RequestObject.create()
			, ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
				spyOn(mockJqXhr, 'done').andCallThrough();
				return mockJqXhr;
			})
			, ajaxResults = obj.fetch();

			expect(ajaxSpy).toHaveBeenCalled();
			expect(ajaxResults.done).toHaveBeenCalled();
			expect(obj.members).toBe('my request result');
		});

		it('Sets up the proper url', function () {
			var fakeResults
			, obj = kiva.RequestObject.create();

			spyOn($, 'ajax').andCallFake(function (args) {
				return {done: function () {}, url: args.url};
			});

			expect(function () {
				obj.fetch({ids: 1});
			}).toThrow();

			fakeResults = obj.fetch({ids: [456, 677]});
			expect(fakeResults.url).toBe(obj.kivaSrc + '/456,677.json');

			fakeResults = obj.fetch({action: 'doStuff'});
			expect(fakeResults.url).toBe(obj.kivaSrc + '/doStuff.json');

			fakeResults = obj.fetch({ids: [456, 788], action: 'doStuff'});
			expect(fakeResults.url).toBe(obj.kivaSrc + '/456/doStuff.json');

			fakeResults = obj.fetch();
			expect(fakeResults.url).toBe(obj.kivaSrc + '.json');
		});
	});
});