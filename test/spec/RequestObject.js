describe('.RequestObject', function () {

	it('creates a pointer (__proto__) directly to the parents prototype', function () {
		var NewConstructor = kiva.Object.extend({fetch: 'overrideValue'});

		expect(NewConstructor.prototype.__proto__.fetch).not.toBe('overrideValue');
	});

	it('leaves a pointer directly to the parents prototype', function () {
		var NewConstructor
		, obj = kiva.Object.create({fetch: 'overrideValue'});

		// Simple test
		expect(obj.__proto__.fetch).not.toBeDefined();

		// Now make sure it also works when creating an object that has been extended
		NewConstructor = kiva.Object.extend({fetch: 'overrideValue'});
		obj = NewConstructor.create();

		expect(obj.__proto__.fetch).toBeDefined();
		expect(obj.__proto__.fetch).not.toBe('overrideValue');

	});


	describe('instance method: .fetch()', function () {

		it ('Throws an exception when .kivaSrc or .zipSrc are not defined on the instance', function () {
			var obj = kiva.Object.create()
			, ajaxSpy = spyOn($, 'ajax');

			expect(function () {
				obj.fetch();
			}).toThrow();
		});


		it ('Makes a $.ajax call and returns the jqXHR results', function () {
			var obj = kiva.Object.create()
			, ajaxSpy = spyOn($, 'ajax').andReturn('ajaxResults')
			, ajaxResults;

			obj.kivaSrc = kiva.kivaSrc + '/loans';
			obj.zipSrc = kiva.zipSrc + '/loans';

			ajaxResults = obj.fetch();

			expect(ajaxSpy).toHaveBeenCalled();
			expect(ajaxResults).toBe('ajaxResults')
		});
	});
});