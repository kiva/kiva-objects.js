describe('.Object', function () {

	describe('static function: .extend()', function () {
		it('returns a new Constructor function that inherits from the current object', function () {
			var NewConstructor = kiva.Object.extend();

			expect(NewConstructor).toEqual(jasmine.any(Function));

			$.each(kiva.Object, function (key, prop) {
				expect(NewConstructor.key).toEqual(kiva.Object.key);
			});

			expect(NewConstructor._super).toBeDefined();
		});


		it('returns a new Constructor function who\'s prototype gets extended with the supplied arguments', function () {
			var NewConstructor = kiva.Object.extend({prop1: 'uno', prop2: 'dos'});

			expect(NewConstructor.prototype.prop1).toBe('uno');
			expect(NewConstructor.prototype.prop2).toBe('dos');
		});
	});


	describe('static function: .create()', function () {
		it('returns an object instance of the current object', function () {
			var myObj = kiva.Object.create();

			expect(Object.getPrototypeOf(myObj)).toEqual(kiva.Object.prototype);
		});


		it('returns an object instance of the current object and extends it with the supplied arguments', function () {
			var dummyProperties = {prop1: 'uno', prop2: 'dos'}
			, myObj = kiva.Object.create(dummyProperties);

			$.each(dummyProperties, function (key, prop) {
				expect(myObj.key).toBe(dummyProperties.key);
			});
		});


		it('sets some default properties', function () {
			var myObj = kiva.Object.create();

			expect($.isArray(myObj.members)).toBe(true);
		})
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