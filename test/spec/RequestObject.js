describe('.RequestObject', function () {

	it('stores a reference to the Kiva and Kiva Zip API', function () {
		expect(typeof kiva.RequestObject.prototype.kivaSrc == 'string').toBe(true);
		expect(typeof kiva.RequestObject.prototype.zipSrc == 'string').toBe(true);
	});


	xit('creates a pointer (__proto__) directly to the parents prototype', function () {

	});


	xit('leaves a pointer directly to the parents prototype', function () {


	});


	it('sets some default properties', function () {
		var myObj = kiva.RequestObject.create();

		expect($.isArray(myObj.members)).toBe(true);
	});


	describe('instance method: .fetch()', function () {

		it ('Makes an $.ajax call and returns the jqXHR results', function () {
			var obj = kiva.RequestObject.create()
			, ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
				return jasmine.createSpyObj('jqXHR spy', ['done']);
			})
			, ajaxResults = obj.fetch();

			expect(ajaxSpy).toHaveBeenCalled();
			expect(ajaxResults.done).toHaveBeenCalled();
		});
	});
});